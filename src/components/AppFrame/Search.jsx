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
    margin: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadius,
    maxWidth: 40,
    height: 40,
    transition: theme.transitions.create('max-width'),
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: (theme.palette.type === 'dark'
        ? fade(theme.palette.common.white, 0.08)
        : fade(theme.palette.common.black, 0.04)
      ),
    },
    '&:focus-within': {
      backgroundColor: theme.palette.primary.light,
      maxWidth: 350,
      cursor: 'text',
    },
  },
  searchIconDiv: {
    width: 40,
    height: 40,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    height: 40,
    cursor: 'inherit',
  },
  inputInput: {
    color: theme.palette.background.default,
    padding: '0 0 0 40px',
    cursor: 'inherit',
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
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
};

export default Search;
