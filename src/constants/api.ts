export const API = {
AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
},

  PROFILE: {
    ME: "/profile/me",
    ROLE: "/profile/role",
  },

  ARTICLES: {
    LIST: "/articles",
    DETAIL: (id: string) => `/articles/${id}`,
  },

  CATEGORIES: {
    LIST: "/categories",
    DETAIL: (id: string) => `/categories/${id}`,
  },

  COMMENTS: {
    ARTICLE: (articleId: string) =>
      `/comments/article/${articleId}`,
    DETAIL: (id: string) => `/comments/${id}`,
  },

  LIKES: {
    TOGGLE: (articleId: string) =>
      `/articles/${articleId}/like`,
    COUNT: (articleId: string) =>
      `/articles/${articleId}/likes`,
  },

  BOOKMARKS: {
    LIST: "/bookmarks",
    TOGGLE: (articleId: string) =>
      `/bookmarks/${articleId}`,
  },

  DASHBOARD: {
    PROFILE: "/dashboard/profile",
    BOOKMARKS: "/dashboard/bookmarks",
    COMMENTS: "/dashboard/comments",
    ARTICLES: "/dashboard/articles",
    STATS: "/dashboard/stats",
  },

  ADMIN: {
    USERS: "/admin/users",
    ARTICLES: "/admin/articles",
    COMMENTS: "/admin/comments",
    CATEGORIES: "/admin/categories",
    STATS: "/admin/stats",
  },
} as const;