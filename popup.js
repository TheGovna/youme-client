$(function() {
  var getVideoId = function(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      videoId = getParamByName('v', url);
      callback(videoId);
    });
  };

  // http://stackoverflow.com/a/901144
  var getParamByName = function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // send a message to the content script
    // https://github.com/stepchowfun/netflixparty-chrome/blob/master/popup.js#L49
    var sendMessage = function(type, data, callback) {
      chrome.tabs.executeScript(tabs[0].id, {file: 'jquery-3.1.1.min.js'}, function() {
        chrome.tabs.executeScript(tabs[0].id, {file: 'socket.io-1.0.6.js'}, function() {
          chrome.tabs.executeScript(tabs[0].id, {file: 'content_script.js'}, function() {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: type,
              data: data
            }, function(response) {
              if (callback) {
                callback(response);
              }
            });
          });
        });
      });
    };

    $('#button').click(function() {
      sendMessage('client_create_user', {}, () => {
        // TODO: uncomment this once i fix user id error
        // getVideoId(function(videoId) {
        //   var msg = {
        //     videoId: videoId,
        //   };
        //   sendMessage('client_create_room', msg, () => {

        //   });
        // });
      });
    });
  });
});
