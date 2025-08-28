import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me({ userId }: { userId: string }) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        include: {
          projectMember: true,
        },
      });

      return {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        fullName: user.fullName,
        projects: user.projectMember.map((project) => ({
          id: project.projectId,
          role: project.role,
        })),
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error);
    }
  }

  async updateMe(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error);
    }
  }
}
