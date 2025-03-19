import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';

export const createAxiosMock = () => {
  const mock = new AxiosMockAdapter(axios);
  mock.onPost('/signup').reply(config => {
    console.log('Request', config.url, config.data);
    return [
      201,
      {}
    ]
  });
  return mock;
}
