/* v8 ignore start */
import axios, { isAxiosError } from "axios";
import HttpClient, { ResponseType } from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

  async post(url: string, data: Record<string, any>): Promise<ResponseType> {
    try {
      const response = await axios.post(url, data);
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      if (error && isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        }
      }
      throw error;
    }
  }

}
