export type GoogleLoginRequest = {
  token: string
}

export type UserResponse = {
  id: number
  name: string
  email: string
  provider: string
  active: boolean
}

export type AuthResponse = {
  token: string
  user: UserResponse
}