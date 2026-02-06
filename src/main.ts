import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

declare const module: any;



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // await app.listen(process.env.PORT ?? 5000);
  app.listen(5000)
  .then( ()=> {
    console.log("successfully started on port 5000");
  })
  .catch( (error) => {
    console.log(error);
  })
}
bootstrap();
