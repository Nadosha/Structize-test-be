import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { JobsModule } from './resources/jobs/jobs.module';

@Module({
  imports: [CommonModule, JobsModule],
})
export class AppModule {}
