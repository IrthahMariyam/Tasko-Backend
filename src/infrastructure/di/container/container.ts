import "reflect-metadata";
import { Container } from "inversify";
import { UserModule } from "./user.container";
import { AdminModule } from "./admin.container";

const container = new Container();
container.load(UserModule, AdminModule);

export { container };
