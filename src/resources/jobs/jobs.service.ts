import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobEntity } from './entities/job.entity';
import { FlowsService } from '../flows/flows.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntity>,
    private readonly flowService: FlowsService,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const createdJob = new this.jobModel(createJobDto);
    await this.flowService.updateJobs(createJobDto.flowId, createdJob._id);

    return createdJob.save();
  }

  findAll(classId: string) {
    return this.jobModel.find({ classId: classId }).exec();
  }

  findOne(id: string) {
    return this.jobModel.findById(id).exec();
  }

  update(id: string, updateFlowDto: UpdateJobDto) {
    return this.jobModel.updateOne({ _id: id }, updateFlowDto).exec();
  }

  remove(id: string) {
    return this.jobModel.deleteOne({ _id: id }).exec();
  }
}
