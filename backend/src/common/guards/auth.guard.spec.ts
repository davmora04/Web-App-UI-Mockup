import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockContext: ExecutionContext;
    let mockRequest: any;

    beforeEach(() => {
      mockRequest = {
        headers: {},
      };

      mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
        getHandler: () => ({}),
      } as ExecutionContext;
    });

    it('should allow access if route is public', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(true);

      const result = await guard.canActivate(mockContext);
      
      expect(result).toBe(true);
      expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if no token provided', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(false);

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should allow access with valid token', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(false);
      mockRequest.headers.authorization = 'Bearer valid-token';
      
      const mockPayload = { sub: 'user123', email: 'test@test.com' };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);

      const result = await guard.canActivate(mockContext);
      
      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockPayload);
    });

    it('should throw UnauthorizedException with invalid token', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(false);
      mockRequest.headers.authorization = 'Bearer invalid-token';
      
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
