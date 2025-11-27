export declare class RegisterUserDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    favoriteTeamId?: string;
}
