import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const strat = Date.now();
    // console.log(res, 'resssssssssssssssssssssssss')

    res.on('finish', () => {
      const duration = Date.now() - strat;

      console.log(
        'endpoint',
        req.originalUrl,
        'method',
        req.method,
        'server time',
        duration,
        'status code',
        res.statusCode,
      );
    });
    next();
  }
}
