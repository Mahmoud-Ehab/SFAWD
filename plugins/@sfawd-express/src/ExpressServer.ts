import bodyParser from "body-parser";
import { Server } from "sfawd";
import { ExpressApp } from "./ExpressApp";

declare type RequestHandler = (req: Express.Request, res: Express.Response) => void

export class ExpressServer extends Server {
  
  private rootHandler: RequestHandler; 
  
  constructor(host: string, port: number) {
    super(new ExpressApp(), host, port);
  }

  root(handler: RequestHandler) {
    this.rootHandler = handler;
  }

  start() {
    // third-party middlewares
    (this.app as ExpressApp).getExpressApp().use(bodyParser.json());

    // router-level middlewares
    this.loadRouters();

    // application-level middlewares
    (this.app as ExpressApp).getExpressApp().get('/', this.rootHandler || ((_req, _res) => {
      _res.write("The server is working. \n");
      _res.write("Redefine the root '/' with server.root(...) method.");
      _res.send();
    }));

    // error-handling middlewares
    (this.app as ExpressApp)
    .getExpressApp().use((err: any, req: any, res: any, next: any) => {
      if (err.code <= 510)
        res.send(err);
      else {
        res.send({
          code: 500,
          message: err.message
        });
      }
    });

    // start the server
    this.app.listen(this.port, this.host, () => {
      console.log(`App is hosting on http://localhost:${this.port}`);
    })
  }
}
