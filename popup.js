$(function() {
  var getCurrentTabUrl = function() {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;

      $('#status').text("hello!!!");
    });
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
      sendMessage('client_create_user', {}, () => { console.log('sendMessage done!'); });
    });
  });
});
