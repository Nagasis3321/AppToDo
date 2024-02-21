import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
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
