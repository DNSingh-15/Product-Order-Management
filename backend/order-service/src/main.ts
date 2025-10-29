import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 4002 },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('🚀 Order Service running on http://localhost:3002');
  console.log('🛰️  TCP Microservice running on port 4002');
}
bootstrap();
