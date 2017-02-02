function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    // http://stackoverflow.com/a/28735569
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match) {
      callback(true, url);
    } else {
      callback(false, "NOT VALID YOUTUBE URL!");
    }
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  // WHY THE FUCK DO I HAVE TO DO THIS

  // jQuery.noConflict();

  getCurrentTabUrl(function(isValidYoutubeUrl, message) {
    renderStatus(message);

    if (isValidYoutubeUrl) {
      jQuery('video').currentTime = 500;
    }
  });
});
