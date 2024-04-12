import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { DeleteTaskResponse, updateTaskResponse } from "./interfaces";
import { TaskResponse } from "./interfaces/task-response";
import { CreateTaskCompletedDto } from "./dto/create-task-completed.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto | CreateTaskCompletedDto) {
    try {
      const newTask = new this.taskModel(createTaskDto);
      return await newTask.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `User Id: ${createTaskDto.idUser} + Title: ${createTaskDto.title} already exits`
        );
      }
    }
  }

  findAll(): Promise<TaskResponse[]> {
    return this.taskModel.find();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.taskModel.updateOne<updateTaskResponse>(
        { _id: id },
        updateTaskDto
      );
      const messageResult = this.resultMessageUpdate(result);
      return messageResult;
    } catch (error) {}
  }

  async remove(id: string) {
    const result: DeleteTaskResponse = await this.taskModel.deleteOne({
      _id: id,
    });
    const resultMenssage = this.resultMessageDelete(result);
    return resultMenssage;
  }

  resultMessageUpdate(result: updateTaskResponse): string {
    if (result.acknowledged) {
      if (result.matchedCount > 0) {
        if (result.modifiedCount > 0) {
          return "La operación fue exitosa y se modificaron los datos.";
        } else if (result.upsertedCount > 0) {
          return "La operación fue exitosa y se insertaron nuevos datos.";
        } else {
          return "La operación fue exitosa pero no se modificaron los datos.";
        }
      } else {
        return "No se encontraron datos que coincidan.";
      }
    } else {
      throw new BadRequestException("La operación no fue reconocida.");
    }
  }

  resultMessageDelete(result: DeleteTaskResponse): string {
    if (result.acknowledged) {
      if (result.deletedCount > 0) {
        return "Delete taks completed";
      } else {
        return "Not found the task register with this id";
      }
    } else {
      throw new BadRequestException("Operation not founded");
    }
  }
}
