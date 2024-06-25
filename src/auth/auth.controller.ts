import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;

    // Validação básica dos dados recebidos (pode ser melhorada conforme necessário)
    if (!email || !password) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
