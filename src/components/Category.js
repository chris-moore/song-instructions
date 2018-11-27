import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
import Instruction from './Instruction';

const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'left',
  },
});

class Category extends React.Component {
  state = {
    open: false,
    selected: null,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, items, title } = this.props;
    const show = <Typography>show options</Typography>;
    const hide = <Typography>hide options</Typography>;
    return (
      <div className={classes.root}>
        <List
          subheader={<ListSubheader color="primary" component="div" disableSticky>{ title }</ListSubheader>}
        >
          { items.map(item => (<Instruction key={item.title} items={item.data} selected={item.selected} title={item.title}/>)) }
        </List>
      </div>
    );
  }
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired,
};

export default withRoot(withStyles(styles)(Category));
