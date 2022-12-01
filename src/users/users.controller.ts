import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createUser: CreateUserDto) {
    if (!createUser.email || !createUser.password)
      throw new HttpException('Campos incompletos', HttpStatus.BAD_REQUEST);
    return this.usersService.create(createUser);
  }

  @Get()
  async findAll(@Query('limit') limit) {
    console.log(this.configService.get<string>('user_variable'));
    const users = await this.usersService.findAll(+limit);
    return { status: 'success', users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { status: 'success', user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
