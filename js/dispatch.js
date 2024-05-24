window.addEventListener('directoryClick', function(e) {
    var musicPlayerIframe = $('#music-player-iframe').get(0);
    var customEvent = new CustomEvent('directoryClickFromP', { detail: e.detail });

    // Check if the iframe has completely loaded before dispatching the event
    if (musicPlayerIframe.contentDocument) {
        musicPlayerIframe.contentDocument.dispatchEvent(customEvent);
        
    } else {
        console.error('The contentDocument of the iframe is not accessible.');
    }
});


window.addEventListener('secretDirectoryClick', function(e) {
    var musicPlayerIframe = $('#music-player-iframe').get(0);
    var customEvent = new CustomEvent('secretDirectoryClickFromP', { detail: e.detail });

    // Check if the iframe has completely loaded before dispatching the event
    if (musicPlayerIframe.contentDocument) {
        musicPlayerIframe.contentDocument.dispatchEvent(customEvent);
        
    } else {
        console.error('The contentDocument of the iframe is not accessible.');
    }
});


window.addEventListener('videoDirectoryClick', function(e) {
    console.log('got clicked');
    var videoPlayerIframe = $('#video-player-iframe').get(0);
    var customEvent = new CustomEvent('videoDirectoryClickFromP', { detail: e.detail });

    // Check if the iframe has completely loaded before dispatching the event
    if (videoPlayerIframe.contentDocument) {
        videoPlayerIframe.contentDocument.dispatchEvent(customEvent);
    } else {
        console.error('The contentDocument of the iframe is not accessible.');
    }
});


window.addEventListener('unlockSignal',function(){
    var musicPlayerIframe = $('#music-player-iframe').get(0);
    var customEvent = new CustomEvent('unlockSignalFromP');
    console.log('unlocked from dispatch');
    if (musicPlayerIframe.contentDocument) {
        musicPlayerIframe.contentDocument.dispatchEvent(customEvent);
        
    } else {
        console.error('The contentDocument of the iframe is not accessible.');
    }
});
