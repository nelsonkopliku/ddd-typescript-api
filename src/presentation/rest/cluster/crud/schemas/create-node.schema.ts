import { ApiProperty, ApiResponseSchemaHost } from '@nestjs/swagger'

export const CREATE_NODE_SCHEMA: ApiResponseSchemaHost['schema'] = {
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}

export class NodeResource {
  @ApiProperty()
  id: string

  @ApiProperty()
  cluster: string

  @ApiProperty()
  name: string

  @ApiProperty()
  poweredOn: boolean
}

export class CreatedNode extends NodeResource {}
