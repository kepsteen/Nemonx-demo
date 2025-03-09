import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { DiplomasModule } from './diplomas/diplomas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StudentsModule, DiplomasModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
