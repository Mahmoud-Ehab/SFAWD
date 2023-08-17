import handler from 'serve-handler';
import http from 'http';
import fs from 'fs';

import { UIApp } from "sfawd";
import { HTMLScreen } from "./HTMLScreen";

export class HTMLApp implements UIApp<HTMLScreen> {
  private server: http.Server;
  private host: string;
  private port: number;
  protected rootdir: string;

  constructor(rootdir: string, host?: string, port?: number) {
    try {
      this.host = host || "127.0.0.1";
      this.port = port || 3000;
      this.rootdir = rootdir;
      if (!fs.existsSync(rootdir))
        fs.mkdirSync(rootdir);
    } 
    catch (err) {
      throw err;
    }
  }

  addScreen(screen: HTMLScreen): void {
    screen.setRootDir(this.rootdir);
    screen.create();
  }

  start(callback: Function): void {
    this.server = http.createServer((req: any, res: any) => {
      return handler(req, res, {
        public: this.rootdir,
        directoryListing: false
      })
    });
    
    this.server.listen(
      this.port, 
      this.host, 
      callback(this.port, this.host)
    );
  }

  close(callback: Function): void {
    this.server.close(callback());
  }
}