export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  role: "reader" | "author" | "admin";
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
}