import { ApiResponseSchemaHost } from '@nestjs/swagger'

export const UPDATE_NODE_SCHEMA: ApiResponseSchemaHost['schema'] = {
  properties: {
    name: {
      type: 'string',
    },
  },
}
