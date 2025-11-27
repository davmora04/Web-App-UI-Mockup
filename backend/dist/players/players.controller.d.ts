import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(dto: CreatePlayerDto): Promise<import("./schemas/player.schema").Player>;
    findAll(): Promise<import("./schemas/player.schema").Player[]>;
    search(query: string): Promise<import("./schemas/player.schema").Player[]>;
    findByTeam(teamId: string): Promise<import("./schemas/player.schema").Player[]>;
    findOne(id: string): Promise<import("./schemas/player.schema").Player>;
    update(id: string, dto: CreatePlayerDto): Promise<import("./schemas/player.schema").Player>;
    remove(id: string): Promise<void>;
}
