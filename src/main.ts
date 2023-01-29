import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "../config";

async function bootstrap() {
  const PORT = config.listenPort
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  });
}
bootstrap();
