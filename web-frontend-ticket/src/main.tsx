import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
			<Provider store={store}>
        <QueryClientProvider client={queryClient}>
{/*import route provider dan panggil router di index router*/}
        <RouterProvider router={router} /> 
        </QueryClientProvider>
      </Provider>
  </StrictMode>,
);