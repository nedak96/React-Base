/**
 * @author Kaden Badalian
 *
 * @filename Search.jsx
 * @date 6/3/20
 */

import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  searchDiv: {
    color: theme.palette.background.default,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    maxWidth: 250,
    transition: theme.transitions.create('max-width'),
    width: '100%',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    '&:focus-within': {
      maxWidth: 400,
    },
  },
  searchIconDiv: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    color: theme.palette.background.default,
    padding: theme.spacing(1, 1, 1, 9),
  },
}));

const Search = () => {
  const [searchString, setSearchString] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const search = () => {
    history.push(`/browse?search=${encodeURIComponent(searchString)}`);
  };

  return (
    <div className={classes.searchDiv}>
      <div className={classes.searchIconDiv}>
        <SearchIcon />
      </div>
      <Input
        value={searchString}
        onBlur={() => setSearchString('')}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            search();
          }
        }}
        disableUnderline
        placeholder="Search Items"
        type="search"
        fullWidth
        classes={{
          input: classes.inputInput,
        }}
      />
    </div>
  );
};

export default Search;
