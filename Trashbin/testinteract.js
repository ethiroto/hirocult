// Add an event listener in the parent document

var videoPlayerIframe=$('#video-player-iframe');

document.addEventListener('fromMusicPlayer', function(e) {
    console.log('Received from music player:', e.detail);
    var videoIframe = $('#video-player-iframe').contents();
    videoIframe.find('body').css('background-color','#a2bb86');
});
