import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response: Response) {
    response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
