import { IsDate, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  idUser: string;

  //   @IsDate()
  //   finishDay?: Date; // Ahora es opcional
  //   @IsDate()
  //   updateDay?: Date; // Ahora es opcional
}
