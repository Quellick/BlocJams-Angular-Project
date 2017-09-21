(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();

/*
 * @desc Buzz object audio file
 * @type {Object}
*/
          var currentBuzzObject = null;
/*
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
*/
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                     formats: ['mp3'],
                     preload: true
    });

    SongPlayer.currentSong = song;
 };
 /*
 *@function playSong
 *@desc plays the current Buzz object and sets the playing property of the song object to true
 */
          var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
 };
 /*
 *@function getSongIndex
 *@desc retrieves index of song from currentAlbum
 */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
 };
/*
* @desc Active song object from list of songs
* @type {Object}
*/
          SongPlayer.currentSong = null;
/*
*@public function SongPlayer.play
*@desc plays the selected Buzz object if its not already playing and sets the playing property of the song object to true
@param {object} song
*/
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
                }
 };
/*
*@public function SongPlayer.pause
*@desc pauses the selected Buzz object if it's not already paused and sets the playing property of the song object to false
@param {object} song
*/
        SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
        };
/*
*@public function SongPlayer.previous
*@desc retrieves song index from current playing song and itterates down to the previous song
*/
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
             }
        };

          return SongPlayer;
        }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
