import path from "path";
import { MikroORM } from "@mikro-orm/core";

import { Project } from "./entities/Project";
import { User } from "./entities/User";

import { __prod__ } from "./constants";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Project, User],
  type: "postgresql",
  dbName: "portfolio-mikro",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
