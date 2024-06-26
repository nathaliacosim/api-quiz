import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './usuario.schema';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}

  async createUser(email: string): Promise<Usuario> {
    try {
      const newUser = new this.usuarioModel({
        email,
        name: '',
        nick: '',
        phoneNumber: '',
      });
      return await newUser.save();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    const user = await this.usuarioModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async updateUser(
    userEmail: string,
    updateData: Partial<Usuario>,
  ): Promise<Usuario> {
    try {
      const updatedUser = await this.usuarioModel
        .findOneAndUpdate({ email: userEmail }, updateData, { new: true })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new InternalServerErrorException('Erro ao atualizar usuário');
    }
  }
}
