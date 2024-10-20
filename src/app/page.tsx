'use client'
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import { store } from './store'; // Import the store
import App from './App'; // Import your main App component

export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
