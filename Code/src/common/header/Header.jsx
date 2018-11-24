import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Axios from 'axios';


import './Header.scss';
import Logo from '../../../public/logo.svg';
import SlideFilters from '../slide-filters/SlideFilters';

import { YoutubeService } from '../../services/youtube/Youtube';

const service = new YoutubeService();


class Header extends Component {
  state = {
    drawerIsOpened: false,
    title: '',
    categories:[]
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      this.setState({title : this.props.setTitle()});
    }, 100);
  }

  componentWillMount() {
    this.props.onChanges(() => this.loadCategories());
  }


  async loadCategories() {
    // service.getCategories()
    Axios.all(await    
      service.getCategories()
      )
         .then((data) => {
          let array = [];
           data.map((item, i)=>{
             data = {
               name: item.snippet.title,
               id: item.id
             };
             array.push(data);
             return array;
           });
           this.setState({
             categories: array,
             isError: false
           });
          // eslint-disable-next-line no-console
           console.log(this.state.categories, 'in category');
         })
         .catch((err) => {
           this.setState({isError: true});
           // eslint-disable-next-line no-console
           console.log(err);
         });
  }


  toggleDrawer = (open) => () => {
    this.setState({
      drawerIsOpened: open
    });
  };

  render() {
    // eslint-disable-next-line no-console
    console.log(this.props);
    return (
      <div id="page-header">
        <nav>
          <div className="logo-bg">
            <Logo className="logo"/>
          </div>
          <div className="opened-module-title">
            {this.state.title}
          </div>
          {this.props.showFilter && <Button className="menu-toggle" onClick={this.toggleDrawer(true)}>
            <SettingsIcon aria-label="Settings"/>
          </Button>}
        </nav>
        <Drawer
          anchor="right"
          open={this.state.drawerIsOpened}
          onClose={this.toggleDrawer(false)}>
            <SlideFilters config={this.props.config} renderComp={this.props.renderComp} categories={this.state.categories} onChanges={this.props.onChanges} toggleDrawer={this.toggleDrawer} />
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  setTitle: PropTypes.func,
  config: PropTypes.object,
  onChanges: PropTypes.func,
  showFilter: PropTypes.bool,
  renderComp: PropTypes.func
};

export default Header;
