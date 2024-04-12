import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsDate()
  @IsOptional()
  createDay?: Date;

  @IsDate()
  @IsOptional()
  finishDay?: Date;

  @IsDate()
  @IsOptional()
  updateDay?: Date;
}
