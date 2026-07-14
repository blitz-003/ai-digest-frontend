export const ROLES = {
  READER: "reader",
  AUTHOR: "author",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];