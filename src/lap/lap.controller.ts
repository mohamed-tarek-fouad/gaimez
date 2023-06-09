/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { LapDto } from "./dtos/createLap.dto";
import { LapService } from "./lap.service";
import { UpdateLapDto } from "./dtos/updateLap.dto";
import { Public } from "src/common/decorators";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

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
  @Post("uploadImages")
  @UseInterceptors(
    FilesInterceptor("images", 20, {
      preservePath: true,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  imageUpload(@UploadedFiles() images) {
    return this.lapService.uploadImage(images);
  }
}
