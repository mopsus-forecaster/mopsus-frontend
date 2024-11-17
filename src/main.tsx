import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { Providers } from './providers';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Providers>
      <AppRouter />
    </Providers>
  </BrowserRouter>
);
