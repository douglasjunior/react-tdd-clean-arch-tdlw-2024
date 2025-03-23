export default interface HttpClient {
  post(url: string, data: Record<string, any>): Promise<ResponseType>
  // get(url: string): Promise<ResponseType>
}

export type ResponseType = {
  status: number
  data: Record<string, any>
}

export class HttpClientMock implements HttpClient {
  async post(): Promise<ResponseType> {
    return {
      status: 201,
      data: { id: 1 },
    }
  }
}
