/* eslint-disable prettier/prettier */
import { LapService } from "./lap.service";
import { LapController } from "./lap.controller";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
@Module({
  imports: [],
  controllers: [LapController],
  providers: [PrismaService, LapService],
})
export class LapModule {}
