import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



let defaultStyle = {
  color: '#a90585'
}

let fakeServerData = {
  user: {
    name: 'Iulia',
    playlists: [
      {
        name: "Cantecelele",
        songs: [
          {name: 'Poezia muzicala', duration: 13}, 
          {name: 'Mama-mia', duration: 13}, 
          {name: 'Fluturasu', duration: 12}
        ]
      },
      {
        name: "Pacanele",
        songs: [
          {name: 'Fructe', duration: 13}, 
          {name: 'Broaste', duration: 13}, 
          {name: 'Piramide', duration: 12}
        ]
      },
      {
        name: "Internet",
        songs: [
          {name: 'Reteaua', duration: 13}, 
          {name: 'Procesorul', duration: 13}, 
          {name: 'Displeiul', duration: 12}
        ]
      },
      {
        name: "Cuvintele",
        songs: [
          {name: 'Jojoba', duration: 13}, 
          {name: 'Pisica', duration: 13}, 
          {name: 'Altceva', duration: 12}
        ]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);
    console.log(totalDuration);
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render () {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src="" alt=""/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul> 
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout (() => {
      this.setState({serverData: fakeServerData})
    }, 2000) ;
  }

  render() {
    let name = 'Iulia'
    let green = '#f43533'
    let headerStyle = {color: 'red', 'font-size': '50px'}
    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}'s Blog
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter  playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
          </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
