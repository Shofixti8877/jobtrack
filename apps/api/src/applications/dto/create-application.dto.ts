import { IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

const APPLICATION_STATUSES = [
  'applied',
  'screening',
  'technical',
  'final',
  'offer',
  'rejected',
] as const;

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsIn(APPLICATION_STATUSES)
  status!: (typeof APPLICATION_STATUSES)[number];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsUrl()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
