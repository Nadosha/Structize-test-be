import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { FlowsService } from './flows.service';

@Controller('flows')
export class FlowsController {
  constructor(private readonly flowsService: FlowsService) {}

  @Post()
  create(@Body() createFlowsInput: CreateFlowDto) {
    return this.flowsService.create(createFlowsInput);
  }

  @Get()
  findAll(@Query('workspace') workspace: string) {
    return this.flowsService.findAll(workspace);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowInput: UpdateFlowDto) {
    return this.flowsService.update(id, updateFlowInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowsService.remove(id);
  }
}
