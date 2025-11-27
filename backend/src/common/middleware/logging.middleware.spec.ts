import { LoggingMiddleware } from './logging.middleware';
import { Request, Response, NextFunction } from 'express';

describe('LoggingMiddleware', () => {
  let middleware: LoggingMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    middleware = new LoggingMiddleware();
    
    mockRequest = {
      method: 'GET',
      originalUrl: '/api/teams',
      ip: '127.0.0.1',
      get: jest.fn((header: string) => {
        if (header === 'user-agent') return 'Mozilla/5.0';
        if (header === 'set-cookie') return [];
        return undefined;
      }) as any,
    };

    mockResponse = {
      statusCode: 200,
      get: jest.fn(),
      on: jest.fn((event, handler) => {
        if (event === 'finish') {
          setTimeout(() => handler(), 0);
        }
        return mockResponse as Response;
      }),
    };

    mockNext = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log incoming request', () => {
    const logSpy = jest.spyOn(middleware['logger'], 'log');

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /api/teams'),
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should log response on finish', (done) => {
    const logSpy = jest.spyOn(middleware['logger'], 'log');

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    setTimeout(() => {
      expect(mockResponse.on).toHaveBeenCalledWith('finish', expect.any(Function));
      done();
    }, 10);
  });

  it('should include requestId if present', () => {
    mockRequest['requestId'] = 'test-request-id-123';
    const logSpy = jest.spyOn(middleware['logger'], 'log');

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('[test-request-id-123]'),
    );
  });
});
