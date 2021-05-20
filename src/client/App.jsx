import './app.scss';

import React from 'react';
import { clientSocket } from './clientSocket';
import { constant } from './Events';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      authors: [],
      feedbackItems: [],
    };
  }

  componentDidMount() {
    const socket = clientSocket();

    socket.emit(constant.get_all, data => {
      this.setState({
        ...data
      });
    });
  }

  render() {
    const { items, authors, feedback_items } = this.state;

    return (<div className='app-wrapper'>
    </div>);
  }
};

export default App;