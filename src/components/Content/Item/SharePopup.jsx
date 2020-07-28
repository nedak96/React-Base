/**
 * @author Kaden Badalian
 *
 * @filename SharePopup.jsx
 * @date 6/23/20
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  IconButton,
  Popper,
  ClickAwayListener,
  Paper,
  Grid,
  Zoom,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Share, Assignment, CheckCircle } from '@material-ui/icons';
import copy from 'copy-to-clipboard';
import ShareButton from './ShareButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    maxHeight: 400,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  roundedButton: {
    borderRadius: 4,
    padding: 6,
  },
  copiedIcon: {
    fill: '#00ff00',
  },
  copyTextInput: {
    padding: 14,
  },
}));

const SharePopup = ({ itemId, title }) => {
  const anchorRef = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `${process.env.REACT_APP_DOMAIN}/item/${itemId}`;

  return (
    <>
      <Tooltip title="Share">
        <IconButton
          ref={anchorRef}
          onClick={() => setOpen(true)}
          className={classes.roundedButton}
          style={{ marginLeft: 8 }}
        >
          <Share />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        placement="right-start"
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Zoom in={open} timeout={250} {...TransitionProps}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} justify="center">
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={url}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        classes: {
                          input: classes.copyTextInput,
                        },
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Copy">
                            <IconButton
                              className={classes.roundedButton}
                              onClick={() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                                copy(url);
                              }}
                            >
                              {
                                copied ? (
                                  <CheckCircle className={classes.copiedIcon} />
                                ) : <Assignment />
                              }
                            </IconButton>
                          </Tooltip>
                        ),
                      }}
                    />
                  </Grid>
                  <ShareButton url={url} media="Facebook" title={title} />
                  <ShareButton url={url} media="Twitter" title={title} />
                  <ShareButton url={url} media="LinkedIn" title={title} />
                  <ShareButton url={url} media="Reddit" title={title} />
                  <ShareButton url={url} media="Email" title={title} />
                </Grid>
              </Paper>
            </Zoom>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

SharePopup.propTypes = {
  itemId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SharePopup;
