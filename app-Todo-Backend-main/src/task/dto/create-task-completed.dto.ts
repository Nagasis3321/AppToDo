import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateTaskCompletedDto {
  @IsString()
  title!: string;
  @IsString()
  description!: string;
  @IsString()
  idUser!: string;
  @IsString()
  status: string;
  @IsString()
  priority: string;
  @IsString()
  type: string;

  @IsString()
  finishDay: string; // Ahora es opcional
}
