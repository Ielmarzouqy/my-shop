import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModulemySQL } from 'src/shared/database.mysql.module';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModulemySQL.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
