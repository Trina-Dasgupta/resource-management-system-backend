import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors(appConfig.cors);

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Apply global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe());

  const port = appConfig.port;
  await app.listen(port, '0.0.0.0');

  console.log(`✅ Authentication Service running on port ${port}`);
  console.log(`🚀 API available at: http://localhost:${port}/api/v1`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start application:', err);
  process.exit(1);
});

