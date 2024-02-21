import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //extract the request
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SEED,
      });
      // 💡 We're assigning the payload rto the request object here
      // so that we can access it in our route handlers

      const user = await this.authService.findUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException("User does not exist");
      }
      if (!user.isActive) {
        throw new UnauthorizedException("User is not active");
      }
      request["user"] = user;
      /// console.log("User from de guard" + user);
    } catch {
      throw new UnauthorizedException();
    }
    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
