import React from 'react';
import ReactDOM from 'react-dom';
import App from '@client/App';

ReactDOM.render(
  <Provider>
      <App />
  </Provider>,
  document.getElementById('app')
);