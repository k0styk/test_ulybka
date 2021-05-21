import './app.scss';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { clientSocket } from './clientSocket';
import { constant } from './Events';
import AddView from './views/Add';
import AddFeedBackView from './views/AddFeedback';
import FilterView from './views/Filter';
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
  filter: {
    author: '',
    item: ''
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      ...defaultState,
      items: [],
      authors: [],
      feedbackItems: [],
    }
  }

  componentDidMount() {
    this.socket = clientSocket();

    this.socket.emit(constant.get_all, data => {
      this.setState({
        ...data
      });
    });
  }

  handleAddAuthor(value) {
    const split = value.trim().split(' ');
    if(split.length === 3) {
      const author = {
        name: split[1],
        lastname: split[0],
        surname: split[2]
      }
  
      this.socket.emit(constant.add_author, author, ({authors, err}) => {
        if(err) {
          console.error(err);
        } else {
          this.setState({
            authors: [...authors],
          });
        }
      });
    } else {
      alert('U need write FIO(lastname name surname)');
    }
  }

  handleAddItem(value) {
    if(value) {  
      this.socket.emit(constant.add_item, {name: value}, ({items, err}) => {
        if(err) {
          console.error(err);
        } else {
          this.setState({
            items: [...items],
          });
        }
      });
    }
  }

  handleAddFeedBack(values) {
    const {
      item,
      author,
      rating
    } = values;
    if(item && author && rating) {  
      this.socket.emit(constant.add_feedback, {item, author, rating}, ({feedbackItems, items, err}) => {
        if(err) {
          console.error(err);
        } else {
          console.log(feedbackItems, items);
          this.setState({
            feedbackItems: [...feedbackItems],
            items: [...items],
          });
        }
      });
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

  handleChangeFilterAuthor(event) {
    this.setState({
      filter: {
        ...this.state.filter,
        author: event.target.value
      }
    });
  }

  handleChangeFilterItem(event) {
    this.setState({
      filter: {
        ...this.state.filter,
        item: event.target.value
      }
    });
  }

  render() {
    const {
      items,
      authors,
      feedbackItems,
      selected,
      filter
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
          <div className="filter-div">
            <div className="items-filter-div">
              {/* <FilterView
                label="Filter by items"
                item={filter.item}
                items={items}
                handleChangeItem={this.handleChangeFilterItem.bind(this)}
              /> */}
            </div>
            <div className="authors-filter-div">
              {/* <FilterView
                label="Filter by authors"
                item={filter.author}
                items={authors}
                handleChangeItem={this.handleChangeFilterAuthor.bind(this)}
              /> */}
            </div>
          </div>
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
          feedbackItems={feedbackItems}
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