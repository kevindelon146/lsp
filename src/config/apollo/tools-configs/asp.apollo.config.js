const SERVICE_NAME = `lsp`
const SERVICE_URL = `http://localhost:8082/graphql`

const ROOT_DIR = `../../../..`

const ENTITIES_PATH_LIB = `${ROOT_DIR}/libs/entities/${SERVICE_NAME}/**/*`
const ENTITIES_PATH = `${ROOT_DIR}/src/entities/**/*`

module.exports = {
  client: {
    includes: [ENTITIES_PATH, ENTITIES_PATH_LIB],
    excludes: [`${ROOT_DIR}/**/*.test.ts`, `${ROOT_DIR}/**/tests/*`],
    service: {
      name: SERVICE_NAME,
      url: SERVICE_URL,
    },
  },
}
