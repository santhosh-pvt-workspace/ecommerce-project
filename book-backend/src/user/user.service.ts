import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserRepository } from './user.repository';
import { RegisterRequestDto, LoginRequestDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto, UserResponseDto } from './dto/user.response.dto';
import { AppJwtService } from '@/utils/jwt.utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: AppJwtService,
  ) {}

  async registerUser(userData: RegisterRequestDto) {
    const isExistingUser = await this.userRepo.findByEmail(userData.email);

    if (isExistingUser) {
      throw new BadRequestException(
        'User already registered with this email! please login!',
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const [newUser] = await this.userRepo.createUser({
      email: userData.email,
      passwordHash: hashedPassword,
      name: userData.name,
      mobileNumber: userData.mobileNumber,
      isVerified: true,
    });

    return UserResponseDto.from(newUser);
  }

  async loginUser(userData: LoginRequestDto) {
    const user = await this.userRepo.findByEmail(userData.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { id, email } = user;

    if (!user.passwordHash) {
      throw new UnauthorizedException('Use google login');
    }

    const isMatch = await bcrypt.compare(userData.password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id, email });

    // ✅ Return structured DTO instead of a raw JWT string
    return AuthResponseDto.from({ token, isVerified: user.isVerified ?? false });
  }

  async getMe(userId: string) {
    const [user] = await this.userRepo.findById(userId);
    if (!user) {
      // ✅ 404 NotFoundException is correct — user not found, not a bad request
      throw new NotFoundException('User not found');
    }
    return UserResponseDto.from(user);
  }

  async getAllUsers() {
    const usersData = await this.userRepo.findAll({ isActive: true });
    return usersData.data.map((user) => UserResponseDto.from(user));
  }
}
