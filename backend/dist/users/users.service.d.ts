import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(dto: RegisterUserDto): Promise<{
        user: User;
        token: string;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
    findOne(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
