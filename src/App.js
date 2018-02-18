import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';



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
      }
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
        <input type="text" onKeyUp={
          event => this.props.onTextChange(event.target.value)
        }/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src={playlist.imageUrl} style={{width: '60px'}} alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul> 
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer' + accessToken}
    }).then(
      response => response.json()
    ).then(
      data => this.setState({
        user: {
          name: data.display_name
        }
      }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer' + accessToken}
    }).then(
      response => response.json()
    ).then(
      data => {this.setState({
        playlists: data.items.map((item) => {
          return {
            name: item.name, 
            imageUrl: item.images[0].url,
            songs: []
          }
        })
      })}
    )
  }

  render() {
<<<<<<< HEAD
    let playlistToRender = 
    this.state.user && 
    this.state.playlists
      ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())) 
      : []
=======
    let name = 'Iulia'
    let green = '#f43533'
    let headerStyle = {color: 'red', 'font-size': '50px'}
>>>>>>> parent of 82062b1... Filter applies to all data
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.user.name}'s Blog
            </h1>
<<<<<<< HEAD
            {this.state.user.playlists &&
            <div>
              <PlaylistCounter playlists={playlistToRender}/>
              <HoursCounter  playlists={playlistToRender}/>
              <Filter onTextChange={text => 
                this.setState({filterString: text})
              }/>
              {playlistToRender.map(
                playlist => <Playlist playlist={playlist}/>
              )}
            </div>}
          </div> : <button onClick={() => window.location='http://localhost:8888/login'}
            style={{'padding': '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with spotify</button>
=======
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter  playlists={this.state.serverData.user.playlists}/>
            <Filter onTextChange={text => 
              this.setState({filterString: text})
            }/>
            {this.state.serverData.user.playlists.filter(
              playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
            ).map(
              playlist => <Playlist playlist={playlist}/>
            )}
          </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
>>>>>>> parent of 82062b1... Filter applies to all data
        }
      </div>
    );
  }
}

export default App;
