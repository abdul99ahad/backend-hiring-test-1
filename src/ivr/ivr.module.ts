import { Module } from '@nestjs/common';
import { IvrService } from './ivr.service';
import { IvrController } from './ivr.controller';

@Module({
  providers: [IvrService],
  controllers: [IvrController],
})
export class IvrModule {}
