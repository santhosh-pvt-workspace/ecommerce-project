import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput, UserRepository } from './user.repository';
import { RegisterRequestDto, LoginRequesDto } from './dto/user.request.dto';
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

  async loginUser(userData: LoginRequesDto) {
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

    return token;
  }
}
