import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionsGuard } from './guards/permissions.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('managed/:id')
  @UseGuards(PermissionsGuard)
  findManaged(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findManagedUsers(id);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
