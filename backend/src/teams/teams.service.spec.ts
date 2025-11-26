import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { getModelToken } from '@nestjs/mongoose';
import { Team } from './schemas/team.schema';

describe('TeamsService', () => {
  let service: TeamsService;
  let mockTeamModel: any;

  const mockTeam = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Real Madrid',
    logo: '⚪',
    leagueId: 'laliga',
    season: '2024-2025',
    points: 45,
    position: 1,
    save: jest.fn().mockResolvedValue(this),
  };

  beforeEach(async () => {
    mockTeamModel = {
      find: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      findByIdAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getModelToken(Team.name),
          useValue: mockTeamModel,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const teams = [mockTeam];
      mockTeamModel.exec.mockResolvedValue(teams);

      const result = await service.findAll();
      
      expect(result).toEqual(teams);
      expect(mockTeamModel.find).toHaveBeenCalled();
      expect(mockTeamModel.sort).toHaveBeenCalledWith({ position: 1 });
    });

    it('should filter by leagueId when provided', async () => {
      mockTeamModel.exec.mockResolvedValue([mockTeam]);

      await service.findAll('laliga');
      
      expect(mockTeamModel.find).toHaveBeenCalledWith({ leagueId: 'laliga' });
    });
  });

  describe('getStandings', () => {
    it('should return teams sorted by points and goal difference', async () => {
      const teams = [mockTeam];
      mockTeamModel.exec.mockResolvedValue(teams);

      const result = await service.getStandings('laliga');
      
      expect(result).toEqual(teams);
      expect(mockTeamModel.find).toHaveBeenCalledWith({ leagueId: 'laliga' });
      expect(mockTeamModel.sort).toHaveBeenCalledWith({ 
        points: -1, 
        goalDifference: -1, 
        goalsFor: -1 
      });
    });
  });

  describe('search', () => {
    it('should search teams by name using regex', async () => {
      mockTeamModel.exec.mockResolvedValue([mockTeam]);

      const result = await service.search('Real');
      
      expect(mockTeamModel.find).toHaveBeenCalledWith({
        name: { $regex: 'Real', $options: 'i' },
      });
      expect(mockTeamModel.limit).toHaveBeenCalledWith(10);
    });
  });
});
