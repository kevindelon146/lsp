export const lsp_BACKEND_APP_PORT = process.env.lsp_BACKEND_APP_PORT
  ? parseInt(process.env.lsp_BACKEND_APP_PORT)
  : 8082
export const lsp_PUBLIC_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  `http://localhost:${lsp_BACKEND_APP_PORT}`
