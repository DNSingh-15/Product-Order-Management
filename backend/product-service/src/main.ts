import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
  });

  // TCP Microservice setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 4001 },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('🚀 Product Service running on http://localhost:3001');
  console.log('🛰️  TCP Microservice running on port 4001');
}
bootstrap();
