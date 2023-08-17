import { Dispatcher } from "sfawd";
import { RD_Request, RD_Response } from "sfawd";

const axios = require("axios").default;

export class AxiosDispatcher extends Dispatcher {
  dispatch(req: RD_Request): RD_Response {
    return axios({
      headers: this.getHeaders(),
      proxy: this.getProxy(),
      method: req.method,
      url: req.url,
      data: req.body,
    });
  }
}