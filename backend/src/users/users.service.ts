import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from './dto/create-user.dto';

/**
 * MÓDULO: Users
 * PROPÓSITO: Gestión de usuarios y autenticación con JWT
 * RELACIÓN CON FRONTEND: Login, registro, perfiles de usuario
 * PROBLEMA QUE RESUELVE: Autenticación segura y gestión de perfiles
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<{ user: User; token: string }> {
    const exists = await this.userModel.findOne({ $or: [{ email: dto.email }, { username: dto.username }] });
    if (exists) throw new ConflictException('Usuario o email ya existe');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await new this.userModel({ ...dto, password: hashedPassword }).save();
    
    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    return { user, token };
  }

  async login(dto: LoginUserDto): Promise<{ user: User; token: string }> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    return { user, token };
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).populate('favoriteTeamId').exec();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
