import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(): object {
    return {
      message: `Welcome to adamsiekierski's blog comments api`,
    };
  }
}
