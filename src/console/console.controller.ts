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
import { ConsoleService } from "./console.service";
import { Public } from "src/common/decorators";
import { CreateConsoleDto } from "./dtos/createConsole.dto";
import { UpdateConsoleDto } from "./dtos/updateConsole.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("console")
export class ConsoleController {
  constructor(private consoleService: ConsoleService) {}
  @Post("createConsole")
  createConsole(@Body() consoleDto: CreateConsoleDto) {
    return this.consoleService.createConsole(consoleDto);
  }
  @Patch("updateConsole/:consoleId")
  updateConsole(
    @Body() updateConsoleDto: UpdateConsoleDto,
    @Param("consoleId") consoleId: string,
  ) {
    return this.consoleService.updateConsole(updateConsoleDto, consoleId);
  }
  @Public()
  @Get("allConsoles")
  allConsoles() {
    return this.consoleService.allConsoles();
  }
  @Public()
  @Get("consoleById/:consoleId")
  consoleById(@Param("consoleId") consoleId: string) {
    return this.consoleService.consoleById(consoleId);
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
    return this.consoleService.uploadImage(images);
  }
}
