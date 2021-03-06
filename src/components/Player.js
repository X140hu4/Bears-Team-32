import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import './Player.css';

function LogInfo(source, message) {
  console.log(`===== ${source} START =====`)
  console.log(message);
  console.log(`===== ${source} END =====`)
}

class Player extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
      artists: []
    }
  }

  componentDidMount() {
    // API Link to Shakira's El Dorado album
    const apiLink = "https://jffy-api.herokuapp.com/api/v1/spotify/?query=https://api.spotify.com/v1/tracks/1D8bmUIhLHEO4KMS2SHwUx";
    axios.get(apiLink).then(res => {
      LogInfo("Player", res); // shows complete message
      this.setState({
        album: res.data.album,
        artists: res.data.artists
      });
    });
  }

  render() {
    return (
      <footer className="playerBar-container">
        <div className="playerBar">
          <Player__left trackData = {this.state}/>
          <Player__center />
          <Player__right />
        </div>
      </footer>
    );
  }
}

class Player__left extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log(this.state);
    this.state = this.props.trackData;
    console.log(this.state);
    // console.log(this.state.artists[0].name);
  }

  render () {
    return (
      <div className="player__left">
        <div className="now-playing">
          <div className="cover-art shadow now-playing__cover-art">
            <div className="covert-art-image"></div>
          </div>
          <div className="track-info elipsis-one-line">
            <div className="track-info__name elipsis-one-line">
              <a href="">Sore Wo Tsuyosa To Yobitai - 2017ver.</a>
            </div>
            <div className="track-info__artists link-subtle elipsis-one-line">
              <a href="">

              </a>
            </div>
          </div>
          <button className="control-button">
            <FontAwesome name="plus" />
          </button>
        </div>
      </div>
    );
  }
}

class Player__center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: "https://p.scdn.co/mp3-preview/b36585e9128f536444f4ed9eb1f327203d147dce?cid=4181eaff195a47029bfbc102712c82c1",
      playing: false,
    }
  }

  togglePlay = () => {
    // Select the audio element
    const player = document.querySelector(".audiosrc");
    
    // Is the audio playing?
    this.setState({
      playing: !this.state.playing,
    });

    // Play/Pause the audio stream
    if(this.state.playing) {
      player.pause();
    } else {
      player.play();
    }
  }
  
  render() {
    return (
      <div className="player__center">
        <audio className="audiosrc" src={this.state.audio}></audio>
        <div className="player-controls">
          <div className="player-controls__buttons">
            <button className="control-button">
              <FontAwesome name="random" />
            </button>
            <button className="control-button">
              <FontAwesome name="step-backward" />
            </button>
            <button className="control-button control-button--circled" onClick={this.togglePlay}>
              { !this.state.playing &&
                <FontAwesome name="play fa-sm"/>
              }
              { this.state.playing &&
                <FontAwesome name="pause fa-sm"/>
              }
            </button>
            <button className="control-button">
              <FontAwesome name="step-forward" />
            </button>
            <button className="control-button">
              <FontAwesome name="repeat" />
            </button>
          </div>
          <div className="playback-bar">
            <div className="playback-bar__progress-time">2:43</div>
            <div className="progress-bar">
              <div className="middle-align progress-bar__bg">
                <div className="progress-bar__fg" style={{width: '66.9757%'}}></div>
                <div className="middle-align progress-bar__slider" style={{left: '66.9757%'}}></div>
              </div>
            </div>
            <div className="playback-bar__progress-time">4:04</div>
          </div>
        </div>
      </div>
    );
  }
}

class Player__right extends Component {
  render() {
    return (
      <div className="player__right">
        <div className="player__right__inner">
          <div className="extra-controls">
          <div className="GlueDropTarget">
            <a className="extra-controls__queue-link" href="/queue">
              <button className="control-button">
                <FontAwesome name="list-ul fa-lg" />
              </button>
            </a>
          </div>
          <span className="connect-device-picker">
            <button className="control-button">
              <FontAwesome name="mobile fa-lg" />
            </button>
          </span>
          <div className="volume-bar">
            <button className="control-button">
              <FontAwesome name="volume-down fa-lg" />
            </button>
            <div className="progress-bar">
              <div className="middle-align progress-bar__bg">
                <div className="progress-bar__fg"  style={{width: '75.3643%'}}></div>
                <div className="middle-align progress-bar__slider"  style={{left: '75.3643%'}}></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;