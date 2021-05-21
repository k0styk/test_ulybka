import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

export default withStyles(useStyles)(({
  name,
  item,
  items,
  label,
  classes,
  selectClass,
  handleChange,
}) => {
  return (<FormControl variant="outlined" className={classes.formControl}>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      className={selectClass}
      label={label}
      value={item}
      onChange={handleChange}
      defaultValue=''
    >
      {(Array.isArray(items)?
        items.map(v => ([v.id, v.fullname || v.name || v.value])):
        Object.entries(items)).map(([key,value])=> (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          )
      )}
    </Select>
  </FormControl>);
});