import { Schema as MongooseSchema } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ collection: 'flows' })
export class FlowEntity {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  workspace: string;

  @Prop()
  jobs?: [MongooseSchema.Types.ObjectId | undefined];
}

export const FlowSchema = SchemaFactory.createForClass(FlowEntity);
