import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity, FlowSchema } from './entities/job.entity';
import { FlowsModule } from '../flows/flows.module';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    FlowsModule,
    MongooseModule.forFeature([
      {
        name: JobEntity.name,
        schema: FlowSchema,
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
