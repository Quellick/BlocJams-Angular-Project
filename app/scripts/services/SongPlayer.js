(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;
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
                  currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                     formats: ['mp3'],
                     preload: true
    });

    currentSong = song;
 };
 /*
 *@function playSong
 *@desc plays the current Buzz object and sets the playing property of the song object to true
 */
          var playSong = function(){
             currentBuzzObject.play();
             song.playing = true;
          }
/*
*@public function SongPlayer.play
*@desc plays the selected Buzz object if its not already playing and sets the playing property of the song object to true
@param {object} song
*/
          SongPlayer.play = function(song) {
              if (currentSong !== song) {

              setSong(song);
              playSong(song);
            } else if (currentSong === song) {
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
             currentBuzzObject.pause();
             song.playing = false;
        };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
