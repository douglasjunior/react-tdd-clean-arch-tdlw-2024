import HttpClient, { ResponseType } from "./HttpClient";

export default class FetchAdapter implements HttpClient {

  async post(url: string, data: Record<string, any>): Promise<ResponseType> {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {
      status: response.status,
      data: await response.json(),
    }
  }

}
