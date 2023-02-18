/* eslint-disable prettier/prettier */

import { Controller, Post, Get, Patch, Param, Body } from "@nestjs/common";
import { LapDto } from "./dtos/createLap.dto";
import { LapService } from "./lap.service";
import { UpdateLapDto } from "./dtos/updateLap.dto";
import { Public } from "src/common/decorators";

@Controller("lap")
export class LapController {
  constructor(private lapService: LapService) {}
  @Post("createLap")
  createLap(@Body() lapDto: LapDto) {
    return this.lapService.createLap(lapDto);
  }
  @Patch("updateLap/:lapId")
  updateLap(@Body() updateLapDto: UpdateLapDto, @Param("lapId") lapId: string) {
    return this.lapService.updateLap(updateLapDto, lapId);
  }
  @Public()
  @Get("allLaps")
  allLaps() {
    return this.lapService.allLaps();
  }
  @Public()
  @Get("lapById/:lapId")
  lapById(@Param("lapId") lapId: string) {
    return this.lapService.lapById(lapId);
  }
}
