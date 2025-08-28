import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import type { User } from '@supabase/supabase-js';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(@GetCurrentUser() user: User) {
    return this.usersService.me({
      userId: user.id,
    });
  }

  @Patch('/me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @GetCurrentUser() user: User,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.id, dto);
  }
}
