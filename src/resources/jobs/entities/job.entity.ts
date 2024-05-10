import { Schema as MongooseSchema } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

export type Triggers = 'Creating New Trigger' | 'Updating Existing Trigger';
export type Actions = 'Send Email' | 'Return value';

@Schema({ collection: 'jobs' })
export class JobEntity {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  trigger: Triggers;

  @Prop()
  action: Actions;

  @Prop()
  flowId: string;
}

export const FlowSchema = SchemaFactory.createForClass(JobEntity);
