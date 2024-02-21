import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsString } from "class-validator";
import { PriorityTask, StatusTask, TypeTask } from "../interfaces";

@Schema()
export class Task {
  _id?: string;

  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;

  @Prop({ default: `${StatusTask.PENDING}` })
  status: string;
  @Prop({ default: PriorityTask.LOW })
  priority: string;
  @Prop({ type: String, default: TypeTask.TASK })
  type: string;
  @Prop({ required: true })
  idUser: string;
  @Prop({ required: true, default: new Date() })
  createDay?: Date;
  finishDay?: Date;
  updateDay?: Date;
}
export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.index({ title: 1, idUser: 1 }, { unique: true });
