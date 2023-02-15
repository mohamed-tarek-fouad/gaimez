/* eslint-disable prettier/prettier */
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt/dist";
import { PrismaService } from "./../prisma.service";
import { ScheduleModule } from "@nestjs/schedule";
import { AtStrategy, RtStrategy } from "./strategies";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({}),
  ],

  controllers: [AuthController],
  providers: [AuthService, PrismaService, AtStrategy, RtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
