import "reflect-metadata";
import { Container } from "inversify";
import { UserModule } from "./user.container";
import { AdminModule } from "./admin.container";
import { ResponseModule } from "./response.container";

const container = new Container();
container.load(UserModule, AdminModule, ResponseModule);

export { container };
