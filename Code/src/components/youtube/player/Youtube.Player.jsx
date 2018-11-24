import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Youtube.Player.scss';
import PropTypes from 'prop-types';


class YoutubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    // const iframe = '<iframe title="Video"' +
    //   '        width="100%"' +
    //   '        height="100%"' +
    //   '        src={https://www.youtube.com/embed/'+id+'?autoplay=1}' +
    //   '        frameBorder="2"' +
    //   '        allowFullScreen />';
    // setTimeout(() => {
    //   if (document.getElementsByClassName('frame-block')[0]) {
    //     document.getElementsByClassName('frame-block')[0].innerHTML = iframe;
    //   }
    // }, 1000);

  }

  componentWillMount() {
    this.props.showFilterHandler(false);
  }
 

  render() {
    const id = window.location.href
      .replace(/^.*\//g, '')
      .replace(/^.*\..*/g, '');
    return (
      <div className="video-container">
        <div className="frame-block">
        <iframe
        title='video'
        width='100%'
        height='100%'
					className="embed-responsive-item"
					src={'https://www.youtube.com/embed/'+id+'?autoplay=1'}
					allowFullScreen
				/>
        </div>
        <div className="controls">
          <Link className="btn btn-primary" to="/youtube"> &#60; Back to Trends</Link>
        </div>
      </div>);
  }
}
YoutubePlayer.propTypes = {
  showFilterHandler : PropTypes.func
};

export default YoutubePlayer;
