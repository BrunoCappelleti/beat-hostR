import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

const getAllArtists = async () => {
  try {
    const resp = await api(`/artists/`);
    return resp.data.users;
  }
  catch(e) {
    console.error(e);
  }
};

const getArtistAlbums = async () => {
  try {
    const resp = await api(`/artist/:artist_id/albums`);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const getAlbumSongs = async (user) => {
  try {
    const resp = await api(`/artist/:artist_id/albums/:album_id/songs`);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const removeAlbum = async (album) => {
  try {
    const resp = await api.destroy(`/artist/:artist_id/albums/`, album);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const postAlbum = async (album) => {
  try {
    const resp = await api.post(`/artist/:artist_id/albums/`, album);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const editAlbum = async (album) => {
  try {
    const resp = await api.put(`/artist/:artist_id/albums/`, album);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const deleteSong = async (song) => {
  try {
    const resp = await api.destroy(`/artist/:artist_id/albums/:album_id/song/`, song);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

const postSong = async (song) => {
  try {
    const resp = await api.post(`/artist/:artist_id/albums/:album_id/song/`, song);
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

export {
  getAllArtists,
  getArtistAlbums,
  getAlbumSongs,
  removeAlbum,
  postAlbum,
  editAlbum,
  deleteSong,
  postSong
}