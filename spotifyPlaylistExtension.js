/**
 * あるプレイリストから曲を削除した際、
 * あらかじめ設定しておいた別のプレイリストにその曲を登録するための関数
 *
 * @param {string} fromPlaylistId - 曲を削除する元のプレイリストID
 * @param {string} toPlaylistId - 曲をバックアップする先のプレイリストID
 * @param {string} trackId - 削除する曲のID
 * @return {void}
 */
const backupTrackBeforeDeletion = async (fromPlaylistId, trackId) => {
  const toPlaylistId = await getBackupPlaylistId();
  addTrackToPlaylist(toPlaylistId, trackId);

  deleteTrackFromPlaylist(fromPlaylistId, trackId);
};

//------------------------------------------------------------------------------------------------------------------------------------

/**
 * バックアップ先のプレイリストIDを保存する関数
 *
 * @param {string} toPlaylistId - 曲をバックアップする先のプレイリストID
 * @return {void}
 */
const saveBackupPlaylistId = async (toPlaylistId) => {
  await chrome.storage.sync.set({ toPlaylistId: toPlaylistId });
};

/**
 * バックアップ先のプレイリストIDを取得する関数
 *
 * @return {Promise<string>} - 曲をバックアップする先のプレイリストID
 */
const getBackupPlaylistId = async () => {
  const result = await chrome.storage.sync.get("toPlayListId");
  return result.toPlaylistId;
};

//------------------------------------------------------------------------------------------------------------------------------------

/**
 * プレイリストから曲を削除する関数
 *
 * @param {string} fromPlaylistId - 曲を削除する元のプレイリストID
 * @param {string} trackId - 削除する曲のID
 * @return {void}
 */
const deleteTrackFromPlaylist = async (fromPlaylistId, trackId) => {
  await fetch(`https://api.spotify.com/v1/playlists/${fromPlaylistId}/tracks`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tracks: [{ uri: `spotify:track:${trackId}` }] }),
  });
};

/**
 * プレイリストに曲を追加する関数
 *
 * @param {string} toPlaylistId - 曲をバックアップする先のプレイリストID
 * @param {string} trackId - 追加する曲のID
 * @return {void}
 */
const addTrackToPlaylist = async (toPlaylistId, trackId) => {
  await fetch(`https://api.spotify.com/v1/playlists/${toPlaylistId}/tracks`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tracks: [{ uri: `spotify:track:${trackId}` }] }),
  });
};

//------------------------------------------------------------------------------------------------------------------------------------

const getAccessToken = async () => {
  // アクセストークンを取得するための何かしらの処理(割愛)
};
