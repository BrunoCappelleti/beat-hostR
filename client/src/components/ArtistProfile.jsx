import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import EditAlbum from './EditAlbum';
import { getUser, getUserMusic, deleteAlbum } from '../services/apiHelper';

class ArtistProfile extends Component {
  constructor() {
    super();

    this.state = {
      currentArtist: {},
      music: [],
      isArtistUser: true,
      showMore: '',
    }

    this.checkUser = this.checkUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.expandAlbumSongs = this.expandAlbumSongs.bind(this);
  }

  checkUser() {
    if (this.props.user.id === parseInt(this.props.match.params.id)) {
      this.setState({
        isArtistUser: true
      });
    };
  };

  handleClick(albumId) {
    const userId = this.state.currentArtist.id;
    this.props.history.push(`/users/${userId}/albumform${albumId ? `/${albumId}` : '/create'}`);
  }

  async getArtist() {
    const resp = await getUser(this.props.match.params.userId);
    this.setState({
      currentArtist: resp.user
    })
  }

  async getArtistMusic(id) {
    const resp = await getUserMusic(id);
    this.setState({
      music: resp.music
    });
  };

  expandAlbumSongs(albumId) {
    this.setState(prevState => ({
      showMore: (albumId === prevState.showMore) ? null: albumId
    }))
  };

  async componentDidMount() {
    await this.getArtist();
    await this.checkUser();
    await this.getArtistMusic(this.state.currentArtist.id);
  }

  render() {
    const { music, isArtistUser, currentArtist, showMore } = this.state;
    const { user, token, artist } = this.props;

    return (
      <div className="profile-page">
        <div className="artist-profile">
          <button id="back" onClick={() => this.props.history.push('/users')}>Back to Artists</button>
          <div className="about-artist">
            <img src={currentArtist.image_url} alt="artist-image"/>
            <h1>{currentArtist.artist_name}</h1>
          </div>
          { isArtistUser &&
              <button onClick={() => this.handleClick()}>Create Album</button>
          }
          <div className="albumList">
            {music.map((album, id) => (
              <div key={album.id} onClick={(ev) => {
                ev.preventDefault()
                this.expandAlbumSongs(album.id)
                }}
                className={album.id === showMore ? 'selected-album' : "album"}>
                <p className="album-name">Name: {album.title}</p>
                <p className="album-genre">Genre: {album.genre}</p>
                <img src={album.image_url} alt="album-image" />
                { isArtistUser &&
                  <button onClick={() => this.handleClick(album.id)}>Edit Album</button>
                }
                {album.id === showMore &&
                  <div className="songs">
                    {album.songs.map(song => (
                      <div className="song" key={song.id}>
                        <p>{song.title}</p>
                        <audio controls src={song.file_url} type='audio'></audio>
                      </div>
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistProfile);
