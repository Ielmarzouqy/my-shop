import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';
// import { request } from 'http';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService
  ) { }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Post('register')
  async create(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,

  ) {
    const hashedPwd = await bcrypt.hash(password, 10);

    return this.authService.create({
      firstName,
      lastName,
      email,
      password: hashedPwd
    })
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough:true}) respone:Response
  ) {

    const user = await this.authService.findOne({ email });
    if (!user) {
      throw new Error('invalid credentials');
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new Error('invalid credentials');

    }
    // console.log("user ", user)
    const jwt = await this.jwtService.signAsync({id:user._id})
    respone.cookie('jwt',jwt,{httpOnly:true})
    return {
      message:"success"
    };

  }
  @Get('user')
  async getUser(@Req() request:Request) {
    // return this.authService.findAll();
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data
  }

  @Get('logout')
  async logout(@Res({passthrough:true}) response:Response) {
    response.clearCookie('jwt')
    return {
      message:"success"
    };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
