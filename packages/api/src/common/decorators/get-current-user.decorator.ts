import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@supabase/supabase-js';

export const GetCurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return user;
  },
);
