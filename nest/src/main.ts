import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  let options = new DocumentBuilder()
    .setTitle('LLM Chat API')
    .setDescription(`LLM Chat API`)
    .setVersion('v1')

  const document = SwaggerModule.createDocument(app, options.build());

  SwaggerModule.setup(
    'api/docs',
    app,
    document
  );

  await app.listen(process.env.PORT || 3001).then(_ => {
    console.info(`LLM Chat API Docs: http://localhost:${process.env.PORT || 3001}/api/docs`)
  });
}
bootstrap();
