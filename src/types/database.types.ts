export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  updated_at: string | null
}

export interface UserWithProfile {
  id: string
  email: string
  profile: Profile | null
}
