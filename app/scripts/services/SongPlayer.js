(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
/*
*@desc which album is playing, for use in next and previous buttons
*@type {Object}
*/
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

              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });


      SongPlayer.currentSong = song;
 };
 /*
 *
 *
 *
 */
      SongPlayer.volume = null;
 /*
 *@function playSong
 *@desc plays the current Buzz object and sets the playing property of the song object to true
 */
          var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
          };
 /*
 *@function stopSong
 *@desc stops the current Buzz object and sets the playing property of the song object to null
 */
          var stopSong = function(){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
          };
/*      
*@function pauseSong
*@desc pauses song and sets song.playing to false so album.html changes play/pause icon
*@param {Object} song
*/
          var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
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
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
          SongPlayer.currentTime = null;
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
                      playSong(song);
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
             pauseSong(song);
        };
/*
*@public function SongPlayer.previous
*@desc retrieves song index from current playing song and itterates down to the previous song
*/
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                stopSong();
             } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
             }
        };
/*
*@public function SongPlayer.next
*@desc retrieves song index from current playing song and itterates up to the next song
*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
               stopSong();
            } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
            }
        };
/*
*
*
*
*/
      SongPlayer.setVolume = function(volume){
         if (currentBuzzObject) {
           currentBuzzObject.setVolume(volume);
         }
      };

/*
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
          }
        };


          return SongPlayer;
        }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
