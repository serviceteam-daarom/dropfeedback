import { Controller, Get } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('login')
  getLogin(): string {
    const indexPath = join(__dirname, '..', '..', 'admin', 'index.html');
    if (existsSync(indexPath)) {
      return readFileSync(indexPath, 'utf8');
    }

    return 'Login page is handled on the client. Use the /auth endpoints to sign in.';
  }
}
