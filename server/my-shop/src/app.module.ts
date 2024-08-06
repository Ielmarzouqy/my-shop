import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModulemySQL } from './shared/database.mysql.module';
import { UserDetailsModule } from './user-details/user-details.module';

@Module({
  imports: [
    DatabaseModulemySQL,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
