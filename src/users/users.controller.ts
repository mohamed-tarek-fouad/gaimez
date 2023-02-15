import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get("")
  allUsers() {
    return this.usersService.allUsers();
  }
  @Get(":id")
  userById(@Param("id") id: string) {
    return this.usersService.userById(id);
  }
}
