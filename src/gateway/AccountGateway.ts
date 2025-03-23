import HttpClient from "../http/HttpClient";

export default interface AccountGateway {
  signup(input: Input): Promise<number>
}

type Input = {
  accountType: string,
  name: string,
  role: string,
  documentNumber: string,
  email: string,
  password: string,
}

export class AccountGatewayHttp implements AccountGateway {
  constructor(readonly httpClient: HttpClient) {}

  async signup(input: Input): Promise<number> {
    const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/users', input);
    
    return response.data.id;
  }
}

export class AccountGatewayMock implements AccountGateway {
  async signup(): Promise<number> {
    return 11;
  }
}
