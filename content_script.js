(function() {
  var socket = io.connect('https://youme-server.herokuapp.com/');
  var userId;
  var video = $('video').get(0);

  var playVideo = function() {
    video.play();
  };
  var pauseVideo = function() {
    video.pause();
  };
  var getCurrentTime = function() {
    video.currentTime;
  };

  socket.on('server_create_user', function(id) {
    if (userId === null) {
      userId = id;
    }
    console.log('server_create_user done!!!');
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === 'client_create_user') {
        socket.emit('client_create_user', {}, function(response) {
          console.log('client_create_user done!!!');
          if (userId === null) {
            userId = response;
          }
        });
      }
    });
})();
