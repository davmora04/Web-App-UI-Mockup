import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersService {
    private playerModel;
    constructor(playerModel: Model<PlayerDocument>);
    create(dto: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
    findByTeam(teamId: string): Promise<Player[]>;
    search(query: string): Promise<Player[]>;
    update(id: string, dto: CreatePlayerDto): Promise<Player>;
    remove(id: string): Promise<void>;
}
