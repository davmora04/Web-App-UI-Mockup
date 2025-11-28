export declare class CreatePlayerDto {
    name: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    nationality: string;
    dateOfBirth?: Date;
    position: string;
    jerseyNumber?: number;
    teamId: string;
    height?: number;
    weight?: number;
    preferredFoot?: string;
    marketValue?: number;
}
export declare class UpdatePlayerDto extends CreatePlayerDto {
}
