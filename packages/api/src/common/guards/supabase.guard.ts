import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createClient, type User } from '@supabase/supabase-js';

@Injectable()
export class SupabaseGuard implements CanActivate {
  private supabase;

  constructor(private reflector: Reflector, private config: ConfigService) {
    this.supabase = createClient(
      this.config.get<string>('SUPABASE_URL') as string,
      this.config.get<string>('SUPABASE_ANON_KEY') as string,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = data.user as User;
    return true;
  }
}
