(function() {
     function Fixtures() {
         var Foo = {};

      var albumPicasso = {
          title: 'The Colors',
          artist: 'Pablo Picasso',
          label: 'Cubism',
          year: '1881',
          albumArtUrl: '/assets/images/album_covers/01.png',
          songs: [
              { name: 'Blue', length: '161.71', audioUrl: '/assets/music/blue' },
              { name: 'Green', length: '103.96', audioUrl: '/assets/music/green' },
              { name: 'Red', length: '268.45', audioUrl: '/assets/music/red' },
              { name: 'Pink', length: '153.14', audioUrl: '/assets/music/pink' },
              { name: 'Magenta', length: '374.22', audioUrl: '/assets/music/magenta' }
        ]
      };

      var albumMarconi = {
          title: 'The Telephone',
          artist: 'Guglielmo Marconi',
          label: 'EM',
          year: '1909',
          albumArtUrl: '/assets/images/album_covers/20.png',
          songs: [
              { name: 'Hello, Operator?', duration: '1:01' },
              { name: 'Ring, ring, ring', duration: '5:01' },
              { name: 'Fits in your pocket', duration: '3:21' },
              { name: 'Can you hear me now?', duration: '3:14' },
              { name: 'Wrong phone number', duration: '2:15' }
          ]
      };

      Foo.getAlbum = function() {
        return albumPicasso;
    };
      Foo.getCollection = function(numberOfAlbums) {
        var collections = [];
        for(var i = 0; i < numberOfAlbums; i++) {
        collections.push(angular.copy(albumPicasso));
      };
        return collections;
      };
        return Foo;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
