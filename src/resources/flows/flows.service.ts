import { Injectable } from '@nestjs/common';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlowEntity } from './entities/flow.entity';

@Injectable()
export class FlowsService {
  constructor(
    @InjectModel(FlowEntity.name)
    private readonly flowModel: Model<FlowEntity>,
  ) {}
  create(createFlowDto: CreateFlowDto) {
    const createdFlow = new this.flowModel(createFlowDto);
    return createdFlow.save();
  }

  async findAll(workspace: string) {
    return this.flowModel.find({ workspace }).exec();
  }

  findOne(id: string) {
    const aggregationPipeline = [
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobs',
          foreignField: '_id',
          as: 'jobs',
        },
      },

      {
        $project: {
          _id: 1,
          workspace: 1,
          name: 1,
          jobs: {
            $map: {
              input: '$jobs',
              as: 'job',
              in: {
                _id: '$$job._id',
                title: '$$job.title',
                trigger: '$$job.trigger',
                action: '$$job.action',
              },
            },
          },
        },
      },
    ];

    return this.flowModel.aggregate(aggregationPipeline).exec();
  }

  async update(id: string, updateFlowInput: UpdateFlowDto) {
    return await this.flowModel
      .findByIdAndUpdate(id, updateFlowInput, { new: true })
      .exec();
  }

  async updateJobs(flowId: string, jobId: string) {
    return await this.flowModel
      .findByIdAndUpdate(flowId, { $push: { jobs: jobId } })
      .exec();
  }

  remove(id: string) {
    return this.flowModel.deleteOne({ _id: id }).exec();
  }
}
