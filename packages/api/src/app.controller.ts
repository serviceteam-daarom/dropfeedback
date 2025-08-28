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
    const buildPath = join(__dirname, '..', '..', '..', 'admin', 'dist', 'index.html');
    const devPath = join(__dirname, '..', '..', '..', 'admin', 'index.html');
    const indexPath = existsSync(buildPath) ? buildPath : devPath;
    if (existsSync(indexPath)) {
      return readFileSync(indexPath, 'utf8');
    }

    return 'Login page is handled on the client. Use the /auth endpoints to sign in.';
  }
}
