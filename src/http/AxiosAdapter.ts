import axios from "axios";
import HttpClient, { ResponseType } from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

  async post(url: string, data: Record<string, any>): Promise<ResponseType> {
    const response = await axios.post(url, data);
    return {
      status: response.status,
      data: response.data,
    }
  }

}
