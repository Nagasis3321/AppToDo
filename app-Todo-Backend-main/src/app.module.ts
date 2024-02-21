import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI_2, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: "6h" },
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
