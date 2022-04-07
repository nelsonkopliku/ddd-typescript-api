import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ClusterManagementModule } from './cluster-management.module'

async function bootstrap() {
  const app = await NestFactory.create(ClusterManagementModule, {
    logger: ['log', 'warn', 'error'],
  })
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
    })
  )

  loadOpenApi(app, 'api')

  await app.listen(3000)
}
bootstrap()

function loadOpenApi(app: INestApplication, path: string) {
  const config = new DocumentBuilder()
    .setTitle('Cluster Management API')
    .setDescription('Manage nodes of computing clusters')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(path, app, document)
}
