import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  create(@Body() createFlowDto: CreateJobDto) {
    return this.jobService.create(createFlowDto);
  }

  @Get()
  findAll(@Query('flowId') flowId: string) {
    return this.jobService.findAll(flowId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowDto: UpdateJobDto) {
    return this.jobService.update(id, updateFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
