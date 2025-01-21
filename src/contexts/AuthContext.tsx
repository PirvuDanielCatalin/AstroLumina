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
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, userData: { username: string; full_name?: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/login`
      }
    })
    if (error) throw error
    
    // Sign in immediately after sign up
    await signIn(email, password)
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
