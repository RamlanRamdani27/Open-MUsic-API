/* eslint-disable camelcase */

exports.up = (pgm) => {
  // 1 relasi playlist dengan owner dengan tabel user
  pgm.addConstraint(
    'playlists',
    'fk_playlists.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );

  // eslint-disable-next-line max-len
  // 2 relasi playlistsongs dengan playlist dan playlistsongs dengan songs dengan tabel playlist dan songs
  pgm.addConstraint(
    'playlistsongs',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)',
  );

  pgm.addConstraint(
    'playlistsongs',
    'fk_playlistsongs.playlistsong_id_playlist.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'playlistsongs',
    'fk_playlistsongs.song_id_song.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE',
  );

  // eslint-disable-next-line max-len
  // 3 relasi collaborations dengan user dan collaborations dengan palylist dengan tabel user dan playlist
  pgm.addConstraint(
    'collaborations',
    'unique_playlist_id_and_user_id',
    'UNIQUE(playlist_id, user_id)',
  );

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  // 1
  pgm.dropConstraint('playlist', 'fk_playlist.owner_users.id');

  // 2
  pgm.dropConstraint('playlistsongs', 'unique_playlist_id_and_song_id');
  pgm.dropConstraint(
    'playlistsongs',
    'fk_playlistsongs.playlistsong_id_playlist.id',
  );
  pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.song_id_song.id');

  // 3
  pgm.dropConstraint('collaborations', 'unique_playlist_id_and_user_id');
  pgm.dropConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id',
  );
  pgm.dropConstraint('collaborations', 'fk_collaborations.user_id_users.id');
};
