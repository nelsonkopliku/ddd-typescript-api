import { PartialType } from '@nestjs/swagger'
import { CreateNodeRequest } from './create-node'

export class UpdateNodeRequest extends PartialType(CreateNodeRequest) {}
