import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { response } from 'express';
import { CreateUserDTO } from '../Dto/create-user.dto';
import { UpdateUserDto } from '../Dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDTO) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created succesfully!',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has benn updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getUserById(@Res() response, @Param('id') userId) {
    try {
      const user = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json(user);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
