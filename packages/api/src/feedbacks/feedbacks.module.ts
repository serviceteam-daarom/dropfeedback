import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';

@Module({
  providers: [FeedbacksService, PrismaService, MailService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
