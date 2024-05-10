import { Module } from '@nestjs/common';
import { FlowsService } from './flows.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowSchema, FlowEntity } from './entities/flow.entity';
import {FlowsController} from "./flows.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlowEntity.name,
        schema: FlowSchema,
      },
    ]),
  ],
  controllers: [FlowsController],
  providers: [FlowsService],
  exports: [FlowsService],
})
export class FlowsModule {}
