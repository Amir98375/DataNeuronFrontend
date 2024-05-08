import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const ProfilePic = ({ imageUrl, altText }) => {
  const classes = useStyles();

  return (
    <Avatar alt={altText} src={imageUrl} className={classes.large} />
  );
};

export default ProfilePic;
