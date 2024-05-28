import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js';
import App from './App'
import { redux_store } from './Redux/reduxStore';
import { ChakraProvider } from '@chakra-ui/react';
createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Provider store={redux_store}>
      <App />
    </Provider>
  </ChakraProvider>,
)
