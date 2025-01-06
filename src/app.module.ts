import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/bootstrap/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';
import { ConfigModule, registerAs } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [registerAs('app', () => ({projectName: 'Prueba'}))]
    }),
    UserModule,
    MongooseModule.forRoot(envs.databaseUrl),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
