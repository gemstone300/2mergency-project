import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT_SECRET_KEY } from 'src/const/env.keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV_JWT_SECRET_KEY),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    console.log('payload', payload);
    console.log(user);
    if (_.isNil(user)) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}
