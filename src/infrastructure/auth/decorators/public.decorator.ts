import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
export const IS_PUBLIC_KEY = 'isPublic'
export function isPublic(reflector: Reflector, context: ExecutionContext) {
  return reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
}
