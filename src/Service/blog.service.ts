import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBlog } from 'src/Interface/blog.inteface';
import { Model } from 'mongoose';
import { CreateBlogDTO } from 'src/Dto/create-blog.dto';
import { UpdateBlogDTO } from 'src/Dto/update-blog.dto';
import { User } from 'src/Schema/user.schema';
import { IUser } from 'src/Interface/user.interface';
import { UserService } from './user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<IBlog>,
    private userService: UserService,
  ) {}

  async createBlog(createBlogDTO: CreateBlogDTO): Promise<IBlog> {
    console.log(createBlogDTO);
    const newBlog = await new this.blogModel(createBlogDTO);
    return newBlog.save();
  }

  async updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogDTO,
  ): Promise<IBlog> {
    const existingBlog = await this.blogModel.findByIdAndUpdate(
      blogId,
      updateBlogDto,
      { new: true },
    );
    if (!existingBlog) {
      throw new NotFoundException('Blog #${blogId} not found');
    }
    return existingBlog;
  }

  async getAllBlogs(): Promise<IBlog[]> {
    const blogs = await this.blogModel.find();
    if (!blogs || blogs.length == 0) {
      throw new NotFoundException('Blogs are not found!');
    }
    return blogs;
  }

  async getBlogById(blogId: string): Promise<IBlog> {
    const blog = await this.blogModel.findById(blogId).exec();
    if (!blog) {
      throw new NotFoundException('Blog #${blogId} not found!');
    }
    return blog;
  }

  async getBlogByUser(userId: string): Promise<IBlog[]> {
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const blogs = await this.blogModel.find({ user: user });
    if (!blogs || blogs.length == 0) {
      throw new NotFoundException('Blogs are not found!');
    }
    return blogs;
  }

  async deleteBlog(blogId: string): Promise<IBlog> {
    const blog = await this.blogModel.findByIdAndDelete(blogId);
    if (!blog) {
      throw new NotFoundException('User #${userId} not found!');
    }
    return blog;
  }

  async getBlogByTag(tag: string): Promise<IBlog[]> {
    const blogs = await this.blogModel.find({ tags: tag });
    if (!blogs || blogs.length == 0) {
      throw new NotFoundException('Blog not found with tag #${tag}!');
    }
    return blogs;
  }
}
