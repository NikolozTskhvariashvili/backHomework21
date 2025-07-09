import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { IsAuth } from 'src/auth/guards/isAuth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(IsAuth)
  @Get()
  getAllStatistics(@Req() req) {
    return this.analyticsService.GetAllStats(req.userId);
  }
}
