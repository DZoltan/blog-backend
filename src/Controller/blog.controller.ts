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
import { BlogService } from 'src/Service/blog.service';
import { response } from 'express';
import { CreateBlogDTO } from 'src/Dto/create-blog.dto';
import { UpdateBlogDTO } from 'src/Dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post()
  async createBlog(@Res() response, @Body() createBlogDTO: CreateBlogDTO) {
    try {
      const newBlog = await this.blogService.createBlog(createBlogDTO);
      return response.status(HttpStatus.CREATED).json({
        message: 'Blog has been created succesfully!',
        newBlog,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Blog not created',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateBlog(
    @Res() response,
    @Param() blogId: string,
    @Body() updateBlogDto: UpdateBlogDTO,
  ) {
    try {
      const blog = await this.blogService.updateBlog(blogId, updateBlogDto);
      return response.status(HttpStatus.OK).json({
        message: 'Blog has been updated',
        blog,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllBlog(@Res() response) {
    try {
      const blogs = await this.blogService.getAllBlogs();
      return response.status(HttpStatus.OK).json({
        blogs,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('user/:userId')
  async getBlogByUser(@Res() response, @Param('userId') userid: string) {
    try {
      const blogs = await this.blogService.getBlogByUser(userid);
      return response.status(HttpStatus.OK).json({
        blogs,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBlogById(@Res() response, @Param('id') blogId: string) {
    try {
      const blog = await this.blogService.getBlogById(blogId);
      return response.status(HttpStatus.OK).json(blog);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/tag/:tag')
  async getBlogByTag(@Res() response, @Param('tag') tag: string) {
    try {
      const blogs = await this.blogService.getBlogByTag(tag);
      return response.status(HttpStatus.OK).json(blogs);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
