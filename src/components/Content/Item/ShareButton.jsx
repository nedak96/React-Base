/**
 * @author Kaden Badalian
 *
 * @filename ShareButton.jsx
 * @date 6/25/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Email,
  Reddit,
} from '@material-ui/icons';
import querystring from 'query-string';

const useStyles = makeStyles({
  roundedButton: {
    borderRadius: 4,
    padding: 6,
  },
  facebookIcon: {
    height: 32,
    width: 32,
    fill: '#3b5998',
  },
  twitterIcon: {
    height: 32,
    width: 32,
    fill: '#1da1f2',
  },
  linkedInIcon: {
    height: 32,
    width: 32,
    fill: '#007bb5',
  },
  emailIcon: {
    height: 32,
    width: 32,
  },
  redditIcon: {
    height: 32,
    width: 32,
    fill: '#ff4500',
  },
  copiedIcon: {
    fill: '#00ff00',
  },
  copyTextInput: {
    padding: 14,
  },
});

const windowConfig = (width, height) => Object.entries({
  left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
  top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
  width,
  height,
}).map(([key, value]) => `${key}=${value}`).join(', ');

const shareUrl = (url, media, title) => {
  let config;
  switch (media) {
    case 'Facebook':
      config = {
        url: 'https://facebook.com/sharer/sharer.php',
        query: {
          u: url,
          quote: title,
        },
      };
      break;
    case 'Twitter':
      config = {
        url: 'https://twitter.com/share',
        query: {
          status: url,
          text: title,
        },
      };
      break;
    case 'LinkedIn':
      config = {
        url: 'https://linkedin.com/shareArticle',
        query: {
          mini: 'true',
          url,
          title,
        },
      };
      break;
    case 'Email':
      config = {
        url: 'mailto:',
        query: {
          body: url,
          subject: title,
        },
      };
      break;
    case 'Reddit':
      config = {
        url: 'https://reddit.com/submit',
        query: {
          url,
          title,
        },
      };
      break;
    default:
      break;
  }
  return querystring.stringifyUrl(config);
};

const shareOnClick = (url, media, title) => {
  if (media === 'Email') {
    window.location.href = shareUrl(url, media, title);
  } else {
    window.open(shareUrl(url, media, title), '', windowConfig(500, 700));
  }
};

const ShareButton = ({ media, url, title }) => {
  const classes = useStyles();

  const Icon = () => {
    switch (media) {
      case 'Facebook':
        return <Facebook className={classes.facebookIcon} />;
      case 'Twitter':
        return <Twitter className={classes.twitterIcon} />;
      case 'LinkedIn':
        return <LinkedIn className={classes.linkedInIcon} />;
      case 'Email':
        return <Email className={classes.emailIcon} />;
      case 'Reddit':
        return <Reddit className={classes.redditIcon} />;
      default:
        return null;
    }
  };

  return (
    <Grid item xs={2}>
      <IconButton
        className={classes.roundedButton}
        onClick={() => shareOnClick(url, media, title)}
      >
        <Icon />
      </IconButton>
    </Grid>
  );
};

ShareButton.propTypes = {
  media: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShareButton;
