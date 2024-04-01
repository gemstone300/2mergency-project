import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private ScheduleRepository: Repository<Schedules>,
  ) {}

  // 스케쥴 등록
  async createSchedule(createScheduleDto: CreateScheduleDto, groupId: number) {
    const { title, content, category, scheduleDate } = createScheduleDto;

    await this.ScheduleRepository.save({
      title,
      content,
      category,
      scheduleDate,
    });

    // 매개변수로 받은 groupId로 그룹을 찾는다.
    const group = await this.ScheduleRepository.find({
      where: { groupId },
    });

    if (!group) {
      return {
        status: HttpStatus.NOT_FOUND,
        messag: '그룹이 존재하지 않습니다.',
      };
    }

    return {
      status: HttpStatus.CREATED,
      message: '스케쥴을 작성하였습니다.',
    };
  }

  // 스케쥴 전체 조회
  /** 클라이언트가 url에 접근하면 자동적으로 싹 보여줌... 그럼 파라미터는 없어도 되는 거 아닌가?**/
  async getAllSchedule() {
    return await this.ScheduleRepository.find({});
  }

  // 스케쥴 상세 조회
}
