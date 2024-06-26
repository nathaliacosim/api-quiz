import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.schema';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: any;
}

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserProfile(@Req() req: RequestWithUser): Promise<Usuario> {
    const userEmail = req.user.email;
    return this.usuarioService.getUserByEmail(userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateUserProfile(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Usuario> {
    const userEmail = req.user.email;
    return this.usuarioService.updateUser(userEmail, updateUserDto);
  }
}
