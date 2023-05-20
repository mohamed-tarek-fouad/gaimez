import { ConsoleService } from "./console.service";
import { ConsoleController } from "./console.controller";

import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [ConsoleController],
  providers: [PrismaService, ConsoleService],
})
export class ConsoleModule {}
