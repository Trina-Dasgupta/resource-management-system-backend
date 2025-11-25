import { Controller, Post, Body, UseGuards, Req, Get, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Problems')
@ApiBearerAuth('access-token')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() body: CreateProblemDto) {
    const problem = await this.problemsService.createProblem(req.user, body);
    return { success: true, message: 'Problem Created Successfully', problem };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const problems = await this.problemsService.getAllProblems(req.user);
    return { success: true, message: 'Problems fetched successfully', problems };
  }

  @UseGuards(JwtAuthGuard)
  @Get('solved')
  async solvedByUser(@Req() req: any) {
    const problems = await this.problemsService.getAllProblemsSolvedByUser(req.user);
    return { success: true, message: 'Problems fetched successfully', problems };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const problem = await this.problemsService.getProblemById(id);
    return { success: true, message: 'Problem fetched', problem };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const updated = await this.problemsService.updateProblem(req.user, id, body);
    return { success: true, message: 'Problem updated', problem: updated };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async remove(@Req() req: any, @Param('id') id: string) {
    await this.problemsService.deleteProblem(req.user, id);
    return { success: true, message: 'Problem deleted Successfully' };
  }
}
