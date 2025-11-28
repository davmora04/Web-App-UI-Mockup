export declare class CreateMatchDto {
    homeTeamId: string;
    awayTeamId: string;
    leagueId: string;
    matchDate: Date;
    status?: string;
    homeScore?: number;
    awayScore?: number;
    matchday?: number;
    venue?: string;
    referee?: string;
}
export declare class UpdateMatchDto extends CreateMatchDto {
}
