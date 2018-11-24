import React, { Component } from 'react';
import Axios from 'axios';
import MovieIcon from '@material-ui/icons/Movie';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

import { YoutubeService } from '../../services/youtube/Youtube';
import './Youtube.scss';

const service = new YoutubeService();

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: [],
      isError: false
    };
  }

  componentWillMount() {
    this.props.setTitle('YOUTUBE');
    this.props.showFilterHandler(true);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.populate );
    this.props.onChanges(() => this.loadVideos());
  }
  // shouldComponentUpdate(nextProps){
  //   // eslint-disable-next-line no-console
  //   console.log('nextProps', nextProps);
  //   // eslint-disable-next-line no-console
  //   console.log('oldProps', this.props);

  //   for (var key in nextProps){
  //     if(nextProps[key] === this.props[key]){
  //       return false;
  //     }
  //     // this.props.onChanges(() => this.loadVideos());
  //   }
  //   return true;
  // }

   populate=()=> {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight 
      // document.documentElement.offsetHeight 
    ) {
      this.loadVideos();
      // eslint-disable-next-line no-console
      console.log('iamScrolling');
    } 
  }

  async loadVideos() {
    Axios.all(await 
      service.getTrendingVideos(),    
      )
         .then((data) => {
           // eslint-disable-next-line no-console
           console.log(data, 'in video');
           this.setState({
             trends:  this.state.trends.concat(data),
             isError: false
           });
         })
         .catch((err) => {
           this.setState({isError: true});
           // eslint-disable-next-line no-console
           console.log(err);
         });
  }
  // myName () {
    

  //   // eslint-disable-next-line no-constant-condition
  //   while(true) {
  //     let windowRelativeBottom = window.innerHeight;
  //     // eslint-disable-next-line no-console
  //   console.log('I am scrolling', windowRelativeBottom); break;
      
  //     // let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
  //     // eslint-disable-next-line no-console
  //   // console.log('I am scrolling', windowRelativeBottom, document.documentElement.clientHeight);
  //     // if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
  //     // eslint-disable-next-line no-console
  //   // console.log('I am scrolling');
  //     // document.body.insertAdjacentHTML('beforeend', `<p>Date: ${new Date()}</p>`);
  //   }
  // }

  

  openVideo() {
    return window.location.href = '/youtube/' + this;

  }

  youtubeCard() {
    // eslint-disable-next-line no-console
    console.log(this.state.trends, 'in youtube card');
    if(this.state.trends.length){
      return this.state.trends.map((videos, index) =>
      <div key={index} className="card-container">
        <div className="card" onClick={this.openVideo.bind(videos.id)}>
          <div className="img-container">
            <img src={videos.thumbnail} alt={videos.title}/>
            <MovieIcon/>
          </div>
          <div className="video-statistic">
            <div className="publishedAt">
              <AvTimerIcon/>
              <span>{videos.publishedAt}</span>
            </div>
            <div className="viewCount">
              <VisibilityIcon/>
              <span>{videos.viewCount}</span>
            </div>
            <div className="likeCount">
              <FavoriteIcon/>
              <span>{videos.likeCount}</span>
            </div>
          </div>
          <p className="video-title text-ellipsis">
            {videos.title}
          </p>
        </div>
      </div>
    );
    }
    
  }

  errorOnPage() {
    return <div className="error-plate">
    <WarningIcon/>
    <span>Error loading. Please try again later.</span>
  </div>;
  }

  render() {
    return !this.state.isError ? ( <div id="youtube"            
    //  // eslint-disable-next-line no-console
    // onWheel={(e)=>console.log('WHEEL!!',e.target)}
    // // eslint-disable-next-line no-console
    // onScroll={(e)=>console.log('SCROLL!!',e)}
    >

      <div className="row">
        {this.youtubeCard()}
      </div>
    </div>) : (this.errorOnPage());
  }
}

Youtube.propTypes = {
  setTitle : PropTypes.func,
  config   : PropTypes.object,
  onChanges: PropTypes.func,
  showFilterHandler: PropTypes.func
};

export default Youtube;
