import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { ApplicationStatus } from './application.js';

@Entity('applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  company!: string;

  @Column()
  position!: string;

  @Column({
    type: 'enum',
    enum: ['applied', 'screening', 'technical', 'final', 'offer', 'rejected'],
  })
  status!: ApplicationStatus;

  @Column({ type: 'date' })
  appliedAt!: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  jobUrl?: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
