import './app.scss';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { routes } from './constants';
import AddView from './views/Add';
import AddFeedBackView from './views/AddFeedback';
import FeedbackView from './views/FeedbackTable';
import ItemsView from './views/ItemsTable';

const useStyles = theme => ({
  button: {
    width: '30%'
  }
});

const defaultState = {
  selected: {
    author: '',
    item: ''
  },
};

const post = (link, options) => {
  return fetch(link, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  });
};

const get = link => {
  return fetch(link);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      ...defaultState,
      items: [],
      authors: [],
      feedbacks: [],
    }
  }

  componentDidMount() {
    get(routes.all)
      .then(response => response.json())
      .then(dt => {
        this.setState({...dt});
      })
      .catch(err => console.error(err));
  }

  handleAddAuthor(value) {
    const split = value.trim().split(' ');
    if(split.length === 3) {
      const author = {
        name: split[1],
        lastname: split[0],
        surname: split[2]
      }
      post(routes.addAuthor, author)
        .then(response => response.json())
        .then(({authors}) => {
          this.setState({
            authors: [...authors],
          });
        })
        .catch(err => console.error(err));
    } else {
      alert('You need write FIO(lastname name surname)');
    }
  }

  handleAddItem(value) {
    if(value) {  
      post(routes.addItem, {name: value})
        .then(response => response.json())
        .then(({items}) => {
          this.setState({
            items: [...items],
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleAddFeedBack(values) {
    const {
      item,
      author,
      rating
    } = values;
    if(item && author && rating) {  
      post(routes.addFeedback, {item, author, rating})
        .then(response => response.json())
        .then(({feedbacks, items}) => {
          this.setState({
            feedbacks: [...feedbacks],
            items: [...items]
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleChangeFeedbackAuthor(event) {
    this.setState({
      selected: {
        ...this.state.selected,
        author: event.target.value
      }
    });
  }

  handleChangeFeedbackItem(event) {
    this.setState({
      selected: {
        ...this.state.selected,
        item: event.target.value
      }
    });
  }

  render() {
    const {
      items,
      authors,
      feedbacks,
      selected,
    } = this.state;
    const { classes } = this.props;

    return (<div className='app-wrapper'>
      <div className="adding-div">
        <div className="left-block-section">
          <div className="add-values-div">
            <div className="authors-add-div">
              <AddView
                label="Add Author"
                labelInput="e.g. Charles Robert Darwin"
                handleAdd={this.handleAddAuthor.bind(this)}
              />
            </div>
            <div className="items-add-div">
              <AddView
                label="Add Items"
                labelInput="e.g. Teapot"
                handleAdd={this.handleAddItem.bind(this)}
              />
            </div>
          </div>
          <div className="filter-div"></div>
        </div>
        <div className="feedback-add-div">
          <AddFeedBackView
            label="Add feedback"
            item={selected.item}
            items={items}
            author={selected.author}
            authors={authors}
            handleChangeAuthor={this.handleChangeFeedbackAuthor.bind(this)}
            handleChangeItem={this.handleChangeFeedbackItem.bind(this)}
            handleAdd={this.handleAddFeedBack.bind(this)}
          />
        </div>
      </div>
      <div className="clear-all-div">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => this.setState({
            ...this.state,
            ...defaultState
          })}
        >
          clear all fields
      </Button>
      </div>
      <div className="pagination-div">
        <FeedbackView
          feedbacks={feedbacks}
          legend="Feedbacks"
        />
        <ItemsView
          items={items}
          legend="Items"
        />
      </div>
    </div>);
  }
};

export default withStyles(useStyles)(App);