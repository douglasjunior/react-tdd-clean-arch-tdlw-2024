import { beforeEach, describe, expect, test, vi } from "vitest";
import AccountGateway, { AccountGatewayHttp } from "./AccountGateway";
import HttpClient, { HttpClientMock } from "../http/HttpClient";

let httpClient: HttpClient;
let gateway: AccountGateway;

const input = {
  accountType: 'administrator',
  name: 'John Doe',
  role: 'Gerente',
  documentNumber: '00011122233',
  email: 'doug@mail.com',
  password: 'senha123',
}

beforeEach(() => {
  httpClient = new HttpClientMock();

  gateway = new AccountGatewayHttp(httpClient);
});

describe('AccountGateway', () => {
  test('Deve testar a chama do endpoint de signup', async () => {
    const spyPost = vi.spyOn(httpClient, 'post');

    const response = await gateway.signup(input);

    expect(response).toBe(1);
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(spyPost).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', input);
  });
});
