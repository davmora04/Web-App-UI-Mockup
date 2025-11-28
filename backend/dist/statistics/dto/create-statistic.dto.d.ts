export declare class CreateStatisticDto {
    playerId: string;
    teamId: string;
    season: string;
    leagueId: string;
    matchesPlayed?: number;
    minutesPlayed?: number;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    tackles?: number;
    interceptions?: number;
    passAccuracy?: number;
    rating?: number;
}
export declare class UpdateStatisticDto extends CreateStatisticDto {
}
