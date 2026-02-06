import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entity/Todo.entity';
import { TodosController } from 'src/controller/todo.controller';
import { TodosService } from 'src/provider/todo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
    controllers: [TodosController],
    providers: [TodosService],
})

export class TodosModule {}