import { Module } from '@nestjs/common';
import { EvaluatesService } from './evaluates.service';
import { EvaluatesController } from './evaluates.controller';

@Module({
  controllers: [EvaluatesController],
  providers: [EvaluatesService]
})
export class EvaluatesModule {}
