import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    width: '100%',
    textAlign: 'left',
  },
});

class Instruction extends React.Component {
  state = {
    open: false,
    selected: this.props.selected,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  selectItem = (value) => this.setState({ selected: value, open: false })

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState(state => ({ selected: this.props.selected }));
    }
  }

  render() {
    const { classes, items, title } = this.props;
    const { selected } = this.state;
    return (
      <div className={classes.root}>
        <List dense>
          <ListItem button divider onClick={this.handleClick}>
            <ListItemText primary={title} />
            <Typography>{ selected }</Typography>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              { items.map(item => (
                <ListItem
                  button
                  key={item.value}
                  selected={item.value === selected}
                  onClick={() => { this.selectItem(item.value) }}
                >
                  <ListItemText primary={item.value} />
                </ListItem>
              )) }
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

Instruction.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selected: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withRoot(withStyles(styles)(Instruction));
