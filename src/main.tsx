import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { RegistryProvider } from './registry/RegistryProvider.ts';
import { AccountGatewayHttp } from './gateway/AccountGateway.ts';
// import FetchAdapter from './http/FetchAdapter.ts';
import AxiosAdapter from './http/AxiosAdapter.ts';

const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
const accountGateway = new AccountGatewayHttp(httpClient);

const registry = {
  accountGateway
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegistryProvider value={registry}>
      <App />
    </RegistryProvider>
  </StrictMode>,
)
