/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Req, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { ApiBearerAuth } from "@nestjs/swagger/dist";
import { ForgetPasswordDto } from "./dtos/forgetPassword.dto";
import { ResetPasswordDto } from "./dtos/resetPassword.dto";
import { Patch } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
} from "src/common/decorators";
import { RtGuard } from "src/common/guards";
import { AuthDto } from "./dtos";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
  @Public()
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @ApiBearerAuth("access-token")
  @Post("logout")
  logout(@Req() req) {
    return this.authService.logout(req);
  }
  @Public()
  @Post("forgetPassword")
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Public()
  @Post("resetPassword/:id/:token")
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param("id") id: string,
    @Param("token") token: string,
  ) {
    return this.authService.resetPassword(resetPasswordDto, id, token);
  }
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }
  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
