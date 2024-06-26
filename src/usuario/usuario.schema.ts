import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  _id: Types.ObjectId; // Alterado para Types.ObjectId

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  nick: string;

  @Prop({ required: true, unique: true }) // Adicionado unique para garantir que o email seja único
  email: string;

  @Prop({ required: false })
  phoneNumber: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
