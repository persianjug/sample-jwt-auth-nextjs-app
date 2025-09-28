export const AppRoutes = {
  // 認証不要なルート
  LOGIN: "/login",
  SIGNUP: "/signup",

  // 認証が必要なルート
  DASHBOARD: "/dashboard",
  // ... その他の認証済みルート
} as const;