import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluateDto } from './create-evaluate.dto';

export class UpdateEvaluateDto extends PartialType(CreateEvaluateDto) {}
