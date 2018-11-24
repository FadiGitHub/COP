import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import deburr from 'lodash/deburr';

import './SlideFilters.scss';
import { appConfig } from '../../config';

// const categoriesList = [
//   {name: 'Film & Animation', id: 1},
//   {name: 'Autos & Vehicles', id: 2},
//   {name: 'Music', id: 10},
//   {name: 'Pets & Animals', id: 4}
// ];

const Handle = Slider.Handle;

const handle = (props) => {
  const {value, dragging, index, ...restProps} = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

handle.propTypes = {
  value   : PropTypes.number,
  dragging: PropTypes.func,
  index   : PropTypes.number
};

function renderInput(inputProps) {
  const {InputProps, ref, ...other} = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index           : PropTypes.number,
  itemProps       : PropTypes.object,
  selectedItem    : PropTypes.string,
  suggestion      : PropTypes.shape({name: PropTypes.string}).isRequired
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : appConfig.countryList.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

// function getSuggestionsC(value) {
//   const inputValue = deburr(value.trim()).toLowerCase();
//   const inputLength = inputValue.length;
//   let count = 0;

//   return inputLength === 0
//     ? []
//     : categoriesList.filter(suggestion => {
//         const keep =
//           count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

//         if (keep) {
//           count += 1;
//         }

//         return keep;
//       });
// }

class SlideFilters extends Component {
   getSuggestionsC=(value)=> {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : this.props.categories.filter(suggestion => {
          const keep =
            count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }
  render() {

    const videosToLoadChange = (val) => {
      // eslint-disable-next-line no-console
      console.log(val);
      this.props.config.maxVideosToLoad = val;
      // this.props.onChanges();
    };
    const selectedCountry = (val) => {
      // eslint-disable-next-line no-console
      console.log(val);
      if(val){
        this.props.config.defaultRegion = val;
        this.props.renderComp();
        this.props.onChanges();
        
      }
    };

    const selectedCategory = (val) => {
      // eslint-disable-next-line no-console
      console.log(val);
      if(val){
        this.props.config.defaultCategoryId = val;
        // this.props.onChanges();
      }
    };

    

    
    return (
      <div className="slide-filters-container">
        <h3 className="title">
          Filters
          <Button className="mat-icon-button" 
          onClick={this.props.toggleDrawer(false)}
          >
            <CloseIcon aria-label="Close"/>
          </Button>
        </h3>
        <Downshift id="countrySelect">
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem
            }) => (<div>
            {renderInput({
              fullWidth: true,
              InputProps: getInputProps(),
              selectedcountry: selectedItem ? selectedCountry(selectedItem) : null,
              label: 'Type to Select Country'
            })}
            <div {...getMenuProps()}>
              {isOpen ? (<Paper square>
                {getSuggestions(inputValue).map((suggestion, index) => renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.code }),
                  highlightedIndex,
                  selectedItem
                }))}
              </Paper>) : null}
            </div>
          </div>)}
        </Downshift>
        <div className="divider"/>
        <Downshift id="categorySelect">
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem
            }) => (<div>
            {renderInput({
              fullWidth: true,
              selectedcategory: selectedItem ? selectedCategory(selectedItem) : null ,
              InputProps: getInputProps(),
              label: 'Type to Select Category'
            })}
            <div {...getMenuProps()}>
              {isOpen ? (<Paper square>
                {this.getSuggestionsC(inputValue).map((suggestion, index) => renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.id }),
                  highlightedIndex,
                  selectedItem
                }))}
              </Paper>) : null}
            </div>
          </div>)}
        </Downshift>
        <div className="divider"/>
        <div className="videosCountPerPage">
          <div className="caption">Count of videos on the page</div>
          <div className="slider">
            <Slider
              min={1}
              max={55}
              defaultValue={this.props.config.maxVideosToLoad}
              handle={handle}
              onAfterChange={videosToLoadChange} />
          </div>
        </div>
      </div>
    );
  }
}

SlideFilters.propTypes = {
  config   : PropTypes.object,
  onChanges: PropTypes.func,
  toggleDrawer: PropTypes.func,
  categories: PropTypes.array,
  renderComp: PropTypes.func
};

export default SlideFilters;
