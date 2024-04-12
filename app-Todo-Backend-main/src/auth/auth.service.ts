import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { log } from "console";

import * as bcryptjs from "bcryptjs";
import { Model } from "mongoose";

import { User } from "./entities/user.entity";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { JwtPayLoad } from "./interfaces/jwt-payload";

import { LoginDto, RegisterDto, CreateUserDto, UpdateUserDto } from "./dto/";
import { LoginResponse } from "./interfaces/login-response";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      //1-Encriptar la contraseña
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        ...userData,
        password: bcryptjs.hashSync(password, 10),
      });
      return await newUser.save();
      //2-Guardar el Usuario

      //3-Generar el JWT
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exits`);
      }
      throw new InternalServerErrorException("Error in new user");
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException(`${email} not valid credencial`);
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException(`${password} not valid credencial`);
    }
    const { password: _, ...rest } = user.toJSON();
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.create(registerDto);
    const token = await this.getJwtToken({ id: user._id });
    const response: LoginResponse = {
      user,
      token,
    };
    return response;
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayLoad) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
