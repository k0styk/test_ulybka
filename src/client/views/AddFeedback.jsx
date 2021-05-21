import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Select from '../components/Select';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  text: {
    width: '40ch',
  },
  fieldset: {
    margin: '8px',
    border: '1px solid silver',
    padding: '8px',   
    borderRadius: '4px'
  },
  legend: {
    padding: '2px'
  }
});

const ratings = [
  { id: 1, value: 1 },  
  { id: 2, value: 2 },  
  { id: 3, value: 3 },  
  { id: 4, value: 4 },  
  { id: 5, value: 5 },  
  { id: 6, value: 6 },  
  { id: 7, value: 7 },  
  { id: 8, value: 8 },  
  { id: 9, value: 9 },  
];

export default withStyles(useStyles)(({
  item,
  items,
  author,
  authors,
  label,
  handleChangeAuthor,
  handleChangeItem,
  labelInput,
  handleAdd,
  classes
}) => {
  const [rating, setRating] = React.useState('');

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{label}</legend>
      <div className={classes.root}>
        <Select
          name="item"
          item={item}
          items={items}
          label="Items"
          selectClass={classes.text}
          handleChange={handleChangeItem}
        />
        <Select
          name="author"
          item={author}
          items={authors}
          label="Authors"
          selectClass={classes.text}
          handleChange={handleChangeAuthor}
        />
        <Select
          item="rating"
          item={rating}
          items={ratings}
          label="Ratings"
          selectClass={classes.text}
          handleChange={event => setRating(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            handleAdd({
              item,
              author,
              rating
            });
            setRating('');
          }}
          fullWidth
        >
          Add
        </Button>
      </div>
    </fieldset>
  );
});