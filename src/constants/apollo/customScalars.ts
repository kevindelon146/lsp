import { UuidScalar } from '@lib/graphql'

import { buildClientSchema, IntrospectionQuery } from 'graphql'
import lspSchema from '@lib/gqlTypes/lsp/schema.json'

const lspExecutableSchema = buildClientSchema(
  lspSchema as unknown as IntrospectionQuery,
)

// These are the custom scalars parse or serialize using apollo Link scalars
export const GraphqlCustomScaler = {
  // scalars of lsp
  lsp: {
    schema: lspExecutableSchema,
    validateEnums: true,
    typesMap: {
      Uuid: UuidScalar,
    },
  },
}
