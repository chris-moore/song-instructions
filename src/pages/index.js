import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import generateSong, { getSettings, getSummary } from '../lib/instructions';
import Category from '../components/Category';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 10,
  },
  container: {
    paddingTop: theme.spacing.unit * 4,
  },
  summary: {
    paddingTop: theme.spacing.unit * 4,
    maxWidth: '600px',
    margin: '0 auto',
  },
  summaryItem: {
    display: 'block',
    textAlign: 'left',
  }
});

class Index extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      settings: [],
      summary: [],
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    const settings = getSettings();
    const summary = getSummary(settings);
    console.log('[index.handleClick] ', summary);
    this.setState({
      settings,
      summary,
    });
  };

  renderSummary(summary, classes) {
    return (
      <ul className={classes.summary}>
        { summary.map(item => (
          <li key={item}>
            <Typography className={classes.summaryItem}>{item}</Typography>
          </li>
        )) }
      </ul>
    );
  }

  render() {
    const { classes } = this.props;
    const { open, settings, summary } = this.state;
    const summaryRender = this.renderSummary(summary, classes);

    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Song Instructions Generator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Generate new song instructions by pressing the button
        </Typography>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          New Song
        </Button>
        <div className={classes.container}>
          { settings.map(item => (<Category key={item.category} items={item.items} title={item.category}/>)) }
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
