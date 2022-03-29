export enum lspAppRoutes {
  homePage = `/`,
  login = `/login`,
  register = `/register`,
  resetPassword = `/login/reset-password`,
  errorPage = `/404`,
  dashboard = `/dashboard`,
  fileStorage = `/dashboard/fileStorage`,
  scripts = `/dashboard/scripts`,
  developer = `/dashboard/devProject`,
}

export const lspRoutesThatIgnoreOrgIdQueryParam = [lspAppRoutes.fileStorage]

export const lspAuthRoutes = [
  lspAppRoutes.dashboard,
  lspAppRoutes.fileStorage,
  lspAppRoutes.scripts,
]

// Routes than authorized users cant visit
export const lspUneffectedRoutes = [lspAppRoutes.errorPage]
