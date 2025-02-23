import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Invites } from './entities/invite.entity';
import { MailModule } from 'src/mail/mail.module';
import { AwsModule } from 'src/aws/aws.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { RoleStrategy } from './strategy/roles.strategy';
import { ENV_JWT_SECRET_KEY } from 'src/const/env.keys';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(ENV_JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users, Invites]),
    UsersModule,
    MailModule,
    AwsModule,
    NestjsFormDataModule,
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, RoleStrategy],
  exports : [AuthService]
})
export class AuthModule {}
