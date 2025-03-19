import HttpClient from "../http/HttpClient";

export default interface AccountGateway {
  signup(input: Input): Promise<Output>
}

type Input = {
  accountType: string,
  name: string,
  role: string,
  documentNumber: string,
  email: string,
  password: string,
}

type Output = {
  status: number
}

export class AccountGatewayHttp implements AccountGateway {
  constructor(readonly httpClient: HttpClient) {}

  async signup(input: Input): Promise<Output> {
    const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/users', input);
    
    return {
      status: response.status,
    }
  }
}

export class AccountGatewayMock implements AccountGateway {
  async signup(): Promise<Output> {
    return {
      status: 201,
    }
  }
}
