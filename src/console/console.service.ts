import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
import { CreateConsoleDto } from "./dtos/createConsole.dto";
import { Cache } from "cache-manager";
import { UpdateConsoleDto } from "./dtos/updateConsole.dto";
@Injectable()
export class ConsoleService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createConsole(consoleDto: CreateConsoleDto) {
    try {
      const console = await this.prisma.console.create({
        data: consoleDto,
      });
      return { ...console, message: "console created successfully" };
    } catch (err) {
      return err;
    }
  }
  async updateConsole(updateConsoleDto: UpdateConsoleDto, consoleId: string) {
    try {
      const consoleExist = await this.prisma.console.findUnique({
        where: {
          id: consoleId,
        },
      });
      if (!consoleExist) {
        throw new NotFoundException("invalid ConsoleId");
      }
      const console = await this.prisma.console.update({
        where: { id: consoleId },
        data: updateConsoleDto,
      });
      return { ...console, message: "updated console successfully" };
    } catch (err) {
      return err;
    }
  }
  async allConsoles() {
    try {
      const consoleCached = await this.cacheManager.get("consoles");
      if (consoleCached) {
        return { consoleCached, message: "fetched all consoles successfully" };
      }
      const console = await this.prisma.console.findMany({});
      if (!console) throw new NotFoundException("there is no consoles");
      await this.cacheManager.set("consoles", console);
      return { ...console, message: "retrieved all consoles successfully" };
    } catch (err) {
      return err;
    }
  }
  async consoleById(consoleId: string) {
    try {
      const consoleCached = await this.cacheManager.get(`console${consoleId}`);
      if (consoleCached)
        return { consoleCached, message: "fetched console successfully" };
      const console = await this.prisma.console.findUnique({
        where: { id: consoleId },
      });
      if (!console) throw new NotFoundException("invalid consoleId");
      await this.cacheManager.set(`console${consoleId}`, console);
      return { ...console, message: "retrived console successfully" };
    } catch (err) {
      return err;
    }
  }
  async uploadImage(files: any) {
    try {
      const filenames = files.map((file) => file.filename);
      const images = await this.prisma.consoleImages.findUnique({
        where: { id: "consoleImage" },
      });
      console.log(images);
      if (images) {
        await this.prisma.consoleImages.update({
          where: { id: "consoleImage" },
          data: { image: { push: filenames } },
        });
      } else {
        await this.prisma.consoleImages.create({
          data: {
            id: "consoleImage",
            image: filenames,
          },
        });
      }
      return { message: "images uploaded successfully" };
    } catch (err) {
      return err;
    }
  }
}
