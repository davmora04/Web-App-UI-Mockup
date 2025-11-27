import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: RegisterUserDto): Promise<{
        user: import("./schemas/user.schema").User;
        token: string;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: import("./schemas/user.schema").User;
        token: string;
    }>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    getProfile(userId: string): Promise<import("./schemas/user.schema").User>;
    update(id: string, dto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
    remove(id: string): Promise<void>;
}
