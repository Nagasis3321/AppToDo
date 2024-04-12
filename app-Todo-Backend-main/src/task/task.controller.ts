import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskResponse } from "./interfaces/task-response";
import { CreateTaskCompletedDto } from "./dto/create-task-completed.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("basic")
  createBasic(@Body() basicCreateTaskDto: CreateTaskDto) {
    return this.createTask(basicCreateTaskDto);
  }

  @Post("advanced")
  createAdvanced(@Body() advancedCreateTaskDto: CreateTaskCompletedDto) {
    return this.createTask(advancedCreateTaskDto);
  }

  private async createTask(
    createTaskDto: CreateTaskDto | CreateTaskCompletedDto
  ) {
    try {
      const newTask = await this.taskService.create(createTaskDto);
      return newTask;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `User Id: ${createTaskDto.idUser} + Title: ${createTaskDto.title} already exists`
        );
      }
      throw error; // Re-throw other errors
    }
  }

  @Get()
  findAll(): Promise<TaskResponse[]> {
    return this.taskService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"
    return this.taskService.findOne(cleanId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const cleanId = id.slice(1);
    return this.taskService.update(cleanId, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    const cleanId = id.slice(1);
    return this.taskService.remove(cleanId);
  }
}
