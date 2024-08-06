import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>

  ){

  }
  // create(data: CreateAuthDto) {
  //   return  'This action adds a new auth';
  // }

  async create(data:any ): Promise<User>{
    return  this.userRepository.save(data);

  }

  findAll() {
    return `users`;
  }

  async findOne(conditions: any) : Promise<User | undefined> {
    console.log("user ", conditions)

    return this.userRepository.findOneBy(conditions);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
