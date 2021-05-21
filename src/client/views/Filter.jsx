import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    width: '36ch',
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
  item,
  items,
  label,
  handleChangeItem,
  classes
}) => {
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{label}</legend>
      <div className={classes.root}>
        <Select
          item={item}
          items={items}
          label={label}
          selectClass={classes.text}
          handleChange={handleChangeItem}
        />
      </div>
    </fieldset>
  );
});