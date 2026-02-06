import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    complete: boolean;

    @Column({ type: 'text', nullable: true })
  description?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  
}