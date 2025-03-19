import HttpClient, { ResponseType } from "./HttpClient";

export default class FetchAdapter implements HttpClient {

  async post(url: string, data: Record<string, any>): Promise<ResponseType> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return {
      status: response.status,
      data: await response.json(),
    }
  }

}
