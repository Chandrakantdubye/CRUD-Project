import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import  type { Request } from 'express';
import {TodoInterface, TodosService } from 'src/provider/todo.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { createTodoSchema, updateTodoSchema } from 'src/validation/todo.schema';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

interface CreateTodoDto {
    name: string,
    complete: boolean
}

@Controller('cats')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private todosService: TodosService) {}

    // @Post()
    //     async create(@Body() createTodoDto: CreateTodoDto) {
    //         const todo = await this.todosService.create(createTodoDto);
    //         if(!todo) {
    //             return 'error in creating todo'
    //         }
    //         return 'todo created successfully'
    //     }
    @Post()
        async create(@Body(new JoiValidationPipe(createTodoSchema)) body: any) {
            // body is validated and cleaned (unknown props stripped)
            return this.todosService.create(body);
        }

    // @Get('ping')
    // ping(){
    //     return 'ping'
    // }

    @Get()
        async findAll(@Req() request: Request) {
            const cats: Array<TodoInterface> = await this.todosService.findAll()
            return cats
        }


    // @Put(':id')
    //     async update(@Param('id') id: string, @Body() body: any) {
    //         console.log("put exec")
    //         const newCat: any = await this.todosService.update(id, body)
    //         return "cat updated";
    //     }

    @Put(':id')
        async update(@Param('id') id: string, @Body(new JoiValidationPipe(updateTodoSchema)) body: any) {
            return  this.todosService.update(id, body);
        }

    @Delete(':id')
        async remove(@Param('id') id:string) {
            await this.todosService.delete(id)
            return "cat deleted"
        }
}