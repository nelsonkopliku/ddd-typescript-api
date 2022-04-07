import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNodeRequest {
  @IsNotEmpty()
  @IsString()
  name!: string
}
