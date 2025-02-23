import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groups } from './entities/group.entity';
import { GroupMembers } from 'src/group-members/entities/group-member.entity';
import { GroupMembersModule } from 'src/group-members/group-members.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MembersRoleStrategy } from 'src/group-members/strategies/members.strategy';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Groups, GroupMembers, Users]),
    GroupMembersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService, MembersRoleStrategy],
})
export class GroupsModule {}
