import { DataController } from "./DataController";

export type Controllers = {
  [tablename: string]: DataController<object>,
}

export abstract class QueryManager {
  protected queriesQueue: Array<Function> = [];
  protected carrier: CarrierStack<any> = new CarrierStack();
  protected inExecution: boolean = false;

  // shall be defined in "connect" method implementations.
  protected controllers: Controllers = {};

  protected controllersTypesList: Array<{
    tablename: string,
    controller: typeof DataController<object>
  }>;

  getController(type: keyof Controllers) {
    return this.controllers[type];
  }

  public addContoller(tablename: string, controller: typeof DataController<object>) {
    this.controllersTypesList.push({
      tablename,
      controller
    });
  }

  protected connect(): Promise<void> {
    throw Error(
      `method is not implemented; a QueryHandler should 
      be initialized and thereby the controllers too.`
    );
  }

  protected async disconnect(): Promise<void> {
    throw Error("method is not implemented.");
  }

  query(func: () => Promise<any>): QueryManager {
    if (this.queriesQueue.length === 0) {
      this.connect();
    }
    this.queriesQueue.push(func);
    return this;
  }
  
  private predisconnect() {
    if (this.queriesQueue.length === 0) {
      this.carrier.reset();
      this.inExecution = false;
      this.disconnect();
    }
  }
  
  async execute(): Promise<void> {
    try {
      if (this.inExecution) return;
      this.inExecution = true;
      while (this.queriesQueue.length > 0) {
        const queryFunc = this.queriesQueue.shift();
        const result = await queryFunc();
        this.carrier.put(result);
      }
      await this.predisconnect();
    }
    catch (e) {
      this.queriesQueue.length = 0;
      await this.predisconnect();
      throw e;
    }
  }
}


class CarrierStack<T> {
  private carrier: Array<T> = [];
  private rdvi: number = -1; // recentDefinedValueIndex

  get(i?: number) {
    return this.carrier[i || this.rdvi];
  }

  put(value: T) {
    this.carrier.splice(0, 0, value);
    this.rdvi = (value !== undefined) ? 0 : ++this.rdvi;
  }

  reset() {
    this.carrier.length = 0;
  }
}