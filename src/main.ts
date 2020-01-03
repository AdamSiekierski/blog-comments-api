import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

NestFactory.create(AppModule).then(app => {
  const port = process.env.PORT || 3000;
  app.listen(port).then(() => {
    console.log(`App listening at port ${port}`);
  });
});
