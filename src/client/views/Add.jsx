import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
  },
});

export default withStyles(useStyles)(({
  label,
  labelInput,
  handleAdd,
  classes
}) => {
  const [value, setValue] = React.useState('');

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{label}</legend>
      <div className={classes.root}>
        <TextField
          className={classes.text}
          label={labelInput}
          variant="outlined"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddCircleIcon />}
          onClick={() => handleAdd(value)}
          fullWidth
        >
          Add
        </Button>
      </div>
    </fieldset>
  );
});