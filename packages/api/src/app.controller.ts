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
    const builtIndexPath = join(__dirname, 'admin', 'index.html');
    if (existsSync(builtIndexPath)) {
      return readFileSync(builtIndexPath, 'utf8');
    }

    const devIndexPath = join(
      __dirname,
      '..',
      '..',
      'admin',
      'dist',
      'index.html',
    );
    if (existsSync(devIndexPath)) {
      return readFileSync(devIndexPath, 'utf8');
    }

    return 'Login page is handled on the client. Use the /auth endpoints to sign in.';
  }
}
