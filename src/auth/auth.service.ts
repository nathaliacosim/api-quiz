import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null; // Usuário não encontrado
    }

    // Comparar a senha fornecida com a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Senha incorreta
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = userDto;

      // Verifica se o usuário já existe
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new BadRequestException('Usuário já existe');
      }

      // Criptografa a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = new this.userModel({
        email,
        password: hashedPassword,
      });

      const savedUser = await createdUser.save();
      return savedUser.toObject(); // Converte para objeto para remover propriedades do Mongoose, como _id
    } catch (error) {
      console.error('Erro ao registrar usuário:', error); // Log do erro para diagnóstico
      throw new InternalServerErrorException('Erro ao registrar usuário');
    }
  }
}
