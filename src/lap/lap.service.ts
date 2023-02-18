/* eslint-disable prettier/prettier */

import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
import { LapDto } from "./dtos/createLap.dto";
import { UpdateLapDto } from "./dtos/updateLap.dto";
import { Cache } from "cache-manager";
@Injectable()
export class LapService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createLap(lapDto: LapDto) {
    try {
      const lap = await this.prisma.lap.create({
        data: lapDto,
      });
      return { ...lap, message: "lap created successfully" };
    } catch (err) {
      return err;
    }
  }
  async updateLap(updateLapDto: UpdateLapDto, lapId: string) {
    try {
      const lapExist = await this.prisma.lap.findUnique({
        where: {
          id: lapId,
        },
      });
      if (!lapExist) {
        throw new NotFoundException("invalid LapId");
      }
      const lap = await this.prisma.lap.update({
        where: { id: lapId },
        data: updateLapDto,
      });
      return { ...lap, message: "updated lap successfully" };
    } catch (err) {
      return err;
    }
  }
  async allLaps() {
    try {
      const lapCached = await this.cacheManager.get("laps");
      if (lapCached) {
        return { lapCached, message: "fetched all laps successfully" };
      }
      const lap = await this.prisma.lap.findMany({});
      if (!lap) throw new NotFoundException("there is no laps");
      await this.cacheManager.set("laps", lap);
      return { ...lap, message: "retrieved all laps successfully" };
    } catch (err) {
      return err;
    }
  }
  async lapById(lapId: string) {
    try {
      const lapCached = await this.cacheManager.get(`lap${lapId}`);
      if (lapCached) return { lapCached, message: "fetched lap successfully" };
      const lap = await this.prisma.lap.findUnique({
        where: { id: lapId },
      });
      if (!lap) throw new NotFoundException("invalid lapId");
      await this.cacheManager.set(`lap${lapId}`, lap);
      return { ...lap, message: "retrived lap successfully" };
    } catch (err) {
      return err;
    }
  }
}
