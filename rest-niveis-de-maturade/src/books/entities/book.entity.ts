import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @IsString()
  title: string;
}
