import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ItemSelect({
  item,
  items,
  label,
  classes,
  handleChangeItem
}) {
  const classes = useStyles();

  return (<FormControl variant="outlined" className={classes.formControl}>
    <InputLabel>Items</InputLabel>
    <Select
      defaultValue=''
      value={item}
      onChange={handleChangeItem}
      label="Author"
    >
      {(Array.isArray(items) ? items.map(({id, name}) => ([id, name])) : Object.entries(items)).map(([key,value])=> (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          )
      )}
    </Select>
  </FormControl>);
};