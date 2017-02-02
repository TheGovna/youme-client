(function() {
  var socket = io.connect('https://stormy-crag-82980.herokuapp.com/');
  var video = $('video').get(0);

  let userId;

  var playVideo = function() {
    video.play();
  };
  var pauseVideo = function() {
    video.pause();
  };
  var getCurrentTime = function() {
    video.currentTime;
  };

  socket.on('server_create_user', function(response) {
    if (userId === undefined) {
      userId = response.user_id;
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === 'client_create_user') {
        socket.emit('client_create_user', {});
      }
    });
})();
