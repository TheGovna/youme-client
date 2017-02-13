(function() {
  var socket = io.connect('https://stormy-crag-82980.herokuapp.com/');
  var video = $('video').get(0);

  var userId = null;

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
    if (userId === null) {
      userId = response.user_id;
    }

    console.log('server_create_user');
    console.log(userId);
  });

  socket.on('server_create_room', function(response) {

  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === 'client_create_user') {
        socket.emit('client_create_user', {});
      } else if (request.type === 'client_create_room') {
        console.log('userId: ' + userId);
        const createRoomData = {
          user_id: userId,
          video_id: request.data.videoId,
          user_in_control: false, // TODO: allow user to choose
          time: getCurrentTime(),
        };
        socket.emit('client_create_room', createRoomData);
      }
    });
})();
