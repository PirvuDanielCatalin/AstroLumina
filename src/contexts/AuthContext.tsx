import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Profile, UserWithProfile } from '../types/database.types'

type AuthContextType = {
  user: UserWithProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: { username: string; full_name?: string }) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profile: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  }

  // Update user state with profile
  const updateUserState = async (sessionUser: User | null) => {
    if (!sessionUser) {
      setUser(null)
      return
    }

    const profile = await fetchProfile(sessionUser.id)
    setUser({
      id: sessionUser.id,
      email: sessionUser.email!,
      profile
    })
  }

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateUserState(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await updateUserState(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    setUser(data.user ? {
      ...data.user,
      profile: profile || null
    } : null)
  }

  const signUp = async (email: string, password: string, userData: { username: string; full_name?: string }) => {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      }
    })
    if (signUpError) throw signUpError

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user?.id,
          username: userData.username,
          full_name: userData.full_name,
          updated_at: new Date().toISOString()
        }
      ])
    if (profileError) throw profileError

    // Sign in immediately after signup
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (signInError) throw signInError

    setUser({
      ...data.user,
      profile: {
        id: user?.id || '',
        username: userData.username,
        full_name: userData.full_name,
        avatar_url: null,
        updated_at: new Date().toISOString()
      }
    })
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in')

    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id)

    if (error) throw error

    // Refresh user profile
    await updateUserState(await supabase.auth.getUser().then(({ data }) => data.user))
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
