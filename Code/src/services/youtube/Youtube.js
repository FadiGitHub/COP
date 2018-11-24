import Axios from 'axios';
import {appConfig} from '../../config';
import {VideoClass} from '../../models/video.class';

const axios = Axios.create({
  baseURL: appConfig.getYoutubeEndPoint('videos')
});

const axiosC = Axios.create({
  baseURL: appConfig.getYoutubeEndPoint('videoCategories')
});

export class YoutubeService {
  // state = {
  //   items : [],

  // }
  getTrendingVideos(videosPerPage = appConfig.maxVideosToLoad) {
    const params = {
      part: appConfig.partsToLoad,
      chart: appConfig.chart,
      videoCategoryId: appConfig.defaultCategoryId,
      regionCode: appConfig.defaultRegion,
      maxResults: videosPerPage,
      key: appConfig.youtubeApiKey,

    };

    // eslint-disable-next-line no-console
    console.log(params);


    return axios.get('/', {params}).then((res) => {
      // this.setState({
      //   item:res.data.items
      // },()=>{
        
      // });
      // return [...this.state.items, res.data.items]
      return res.data.items

        .map((item) => new VideoClass(item))
        .filter((item) => item.id !== '');
    }).catch((err) => err);
  }

  getCategories(){
    // eslint-disable-next-line no-console
    console.log('i am running for categories');
    const params = {
      part: 'snippet',
      regionCode: appConfig.defaultRegion,
      key: appConfig.youtubeApiKey
    };
    // eslint-disable-next-line no-console
    console.log(params);
    return axiosC.get('/',{params}).then((res)=>{
      return res.data.items;
    }).catch((err) => err);
  }
}
