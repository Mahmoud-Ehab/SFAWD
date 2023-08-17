import { DataController, QueryManager } from "sfawd";
import { ClientConfig } from "pg";

import { PostgresQueryGenerator } from "./PostgresQueryGenerator";
import { PostgresQueryHandler } from "./PostgresQueryHandler";

export class PostgresQueryManager extends QueryManager {
  private queryHandler: PostgresQueryHandler<any>;
  private config: ClientConfig

  constructor(config: ClientConfig) {
    super();
    this.config = config;
  }

  protected connect(): Promise<void> {
    this.queryHandler = new PostgresQueryHandler(this.config);

    for (let controllerObj of this.controllersInfoList) {
      this.controllers[controllerObj.tablename] = new (controllerObj.controller as any)(
        this.queryHandler, 
        new PostgresQueryGenerator(controllerObj.tablename)
      )
    }

    return this.queryHandler.connect();
  }

  protected async disconnect(): Promise<void> {
    await this.queryHandler.end();
  }
}
