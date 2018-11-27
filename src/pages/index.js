import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import generateSong, { getSettings } from '../lib/instructions';
import Category from '../components/Category';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      settings: [],
    };
  }
  
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    const settings = getSettings();
    console.log('[index.handleClick] ', settings);
    this.setState({
      settings,
    });
  };

  render() {
    const { classes } = this.props;
    const { open, settings } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Song Instructions Generator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Generate new song instructions by pressing the button
        </Typography>
        <Button variant="contained" color="primary" onClick={this.handleClick} gutterBottom>
          New Song
        </Button>
        { settings.map(item => (<Category key={item.category} items={item.items} title={item.category}/>)) }
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
