import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions')
@ApiBearerAuth('access-token')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllSubmission(@Req() req: any) {
    const userId = req.user.id;
    const submissions = await this.submissionsService.getAllSubmissionsForUser(userId);
    return { success: true, message: 'Submissions fetched successfully', submissions };
  }

  @UseGuards(JwtAuthGuard)
  @Get('problem/:problemId')
  async getSubmissionsForProblem(@Req() req: any, @Param('problemId') problemId: string) {
    const userId = req.user.id;
    const submissions = await this.submissionsService.getSubmissionsForProblem(userId, problemId);
    return { success: true, message: 'Submissions fetched successfully', submissions };
  }

  @UseGuards(JwtAuthGuard)
  @Get('problem/:problemId/count')
  async getAllTheSubmissionsForProblem(@Param('problemId') problemId: string) {
    const count = await this.submissionsService.countSubmissionsForProblem(problemId);
    return { success: true, message: 'Submissions fetched successfully', count };
  }
}
