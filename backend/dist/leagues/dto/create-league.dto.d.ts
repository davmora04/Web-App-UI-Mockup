export declare class CreateLeagueDto {
    leagueId: string;
    name: string;
    country: string;
    logo?: string;
    season: string;
    startDate?: Date;
    endDate?: Date;
    currentMatchday?: number;
    totalMatchdays?: number;
}
export declare class UpdateLeagueDto extends CreateLeagueDto {
}
