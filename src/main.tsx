import { ApolloProvider } from '@apollo/client/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createApolloClient } from './apollo/client.ts';
import { BusinessCardPage } from './features/business-card/BusinessCardPage.tsx';
import './index.css';

const apiUrl = import.meta.env.VITE_API_URL;
const client = createApolloClient(apiUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      {/* Apollo Sandbox is served by the API itself at the same URL. */}
      <BusinessCardPage sandboxUrl={apiUrl} />
    </ApolloProvider>
  </StrictMode>,
);
