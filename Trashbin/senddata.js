function sendDataToParent() {
    var data ='btn Clicked';
    var event = new CustomEvent('fromMusicPlayer', { detail: data });
    window.parent.document.dispatchEvent(event);
}

// Example: Call this function to send data to the paren

testBtn=$('.test-btn');

testBtn.on('click', function(){
    sendDataToParent();
});