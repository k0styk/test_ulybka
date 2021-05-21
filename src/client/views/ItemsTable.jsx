import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  rootT: {
    display: 'flex',
    flex: '1 0 auto',
    margin: '4px',
    padding: '4px',
    overflow: 'hidden',
  },
  tableContainerFlex: {
    flex: '1 1 auto',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  tableRelativeContainer: {
    flex: '1 0 auto',
    position: 'relative',
  },
  tableAbsoluteContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    overflow: 'auto',
    '&::-webkit-scrollbar-track': {
      borderRadius: '3px',
      background: '#a6a6a6',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '3px',
      background: '#cccccc',
    },
  },
  tablePaginationFlex: {
    background: '#CCCCCC',
    flex: '0 1 auto',
    overflow: 'hidden',
    minHeight: '52px'
  },
  fieldset: {
    flex: '1 0 auto',
    margin: '8px',
    border: '1px solid silver',
    padding: '8px',   
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  legend: {
    padding: '2px'
  },
  numberHeader: {
    width: '20px'
  },
  itemHeader: {
    width: '170px'
  }
});

const ItemsTableView = ({
  items,
  legend
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.rootT}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}>{legend}</legend>
        <TableContainer className={classes.tableContainerFlex}>
          <TableContainer className={classes.tableRelativeContainer}>
            <TableContainer className={classes.tableAbsoluteContainer}>
              {items.length ? (
                <Table
                  className={classes.table}
                  size="medium"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.numberHeader}>№</TableCell>
                      <TableCell className={classes.itemHeader}>Item name</TableCell>
                      <TableCell align="center">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index} >
                          <TableCell>{(page * rowsPerPage) + index + 1}</TableCell>
                          <TableCell>{row['name']}</TableCell>
                          <TableCell align="center">{row['avg_rating']}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>) : <h2>Items clear</h2>}
            </TableContainer>
          </TableContainer>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Rows per page"
          className={classes.tablePaginationFlex}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </fieldset>
    </Paper >
  );
};

export default ItemsTableView;