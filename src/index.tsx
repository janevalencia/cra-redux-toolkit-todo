import React from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components';
import App from './App';
import './index.css';

// Redux provider and store.
import { Provider } from 'react-redux';
import store from './app/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

// Wrap component with the Provider.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </React.StrictMode>
);