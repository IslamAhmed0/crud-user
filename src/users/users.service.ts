import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, {Model}  from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { user } from './interfaces/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel:Model<user>) {};
  async create(createUserDto: CreateUserDto) {
    try {
      let { email } = createUserDto;
      let found = await this.userModel.findOne({
         email: email ,
      });
      if (!found) {
        const salt:number = Math.floor(Math.random() * 7 + 6);
        const hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password=hash;
        createUserDto.salt=salt
        const newUser = new this.userModel(createUserDto);
        const saved = await newUser.save();
        return saved;
      }
      else {
        throw new HttpException(
          'Email already Exists ',
          HttpStatus.BAD_REQUEST,
        );
      }
    }catch (error){
      throw new InternalServerErrorException(error);

    }


  }

  async findAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    console.log(id)
    try {
      let user = await this.userModel.findOne({ _id: id});
      console.log(user)
      if (!user) throw new NotFoundException('user is not found');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id,updateUserDto)
    try {
      let user = await this.userModel.findOne({ _id: id});
      console.log(user)
      if (!user) throw new NotFoundException('user is not found');
       return  await this.userModel.findByIdAndUpdate(id , updateUserDto);


    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id:number) {
    try {
      let user = await this.userModel.findOne({ _id: id});
      console.log(user)
      if (!user) throw new NotFoundException('user is not found');
      return await this.userModel.findByIdAndRemove(id);

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
