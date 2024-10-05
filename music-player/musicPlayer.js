$(window).on('load',function(){
setTimeout(() => { //Wrap everything in a 1 second delay

//Get the songNames from localstorage (assigned in music Directory)
var songNames= JSON.parse(localStorage.getItem('songFiles'));
var secretSongNames= JSON.parse(localStorage.getItem('secretSongFiles'));
var songsUnlocked= JSON.parse(localStorage.getItem('unlockedState'));


//need to play a starting sound (for some reason ios mobile needs this first now)
$(window).on('click',function(){
    $('#startupSound')[0].play();
});


//need to register the initial # of songNames
const initialSongNamesLength=songNames.length;
//Need this because you want this to remain constant, but only change for the secret songs when secret btn clicked.
//bc we add to songNames initially, but don't want full access.
var playlistLength=songNames.length;
console.log(songNames.length);


//finding UI elements
playButton = $('#play');
timelineSlider = $('#song-timeline');
songTimeDisplay = $('.song-time');

//Setting states for player
let songOnDeck = null;
let playing = false;
let currentSongIndex = 0;

//creating empty song array
songs={};

//Finding files in songnames and assigning them to an object with the name and a howl object
for (let i = 0; i < songNames.length; i++) {
    let songName = songNames[i];
    songs[songName] = new Howl({
        src: ['songs/'+songNames[i]+'.mp3'], // empty source
        volume: 1.0
    });
}

//Set first song to songOnDeck and set the name for the visual
songOnDeck = songs[songNames[0]];

$('.song-name').html(songNames[0]+'.mp3');


$(document).on('directoryClickFromP', function(e) {
    console.log(songs[e.detail.songSent]);
    playCD(songs[e.detail.songNameSent], e.detail.songNameSent);
  });


function addSecretSongs(){
if (playlistLength != (initialSongNamesLength+secretSongNames.length)) {
    for (let i = 0; i < secretSongNames.length; i++) {
        let songName = secretSongNames[i];
        songNames.push(songName);  // Add to songNames array
        playlistLength = songNames.length;
        songs[songName] = new Howl({
            src: ['songs/' + secretSongNames[i] + '.mp3'],
            volume: 1.0
        });
    }
    // Update playlistLength to include secret songs
    playlistLength = songNames.length;
    
}
}

//CHECK IF FOLDER IS ALREADY UNLOCKED AND IF SO ADD SECRET SONGS
if (songsUnlocked==true){
    addSecretSongs();
}

//WHEN SECRET FOLDER GETS UNLOCKED, SIGNAL GETS SENT HERE SO THEY CAN BE ADDED TO THE SONGNAMES
$(document).on('unlockSignalFromP', function() {
    addSecretSongs();
});

//LISTEN FOR CLICK FROM SECRET DIRECTORY
$(document).on('secretDirectoryClickFromP', function(e) {
    playCD(songs[e.detail.songNameSent], e.detail.songNameSent);
});



// Play/pause song when the play button is clicked
$(playButton).on('click', '.btn', function(){
    if(playing == false){
    //UI change
      playButton.html('<div class="btn" style="background-image: url(\'icons/pause.png\');"></div>');

      songOnDeck.play();
      playing = true;
    } else {
        //UI
      playButton.html('<div class="btn" style="background-image: url(\'icons/play.png\');"></div>');
      songOnDeck.pause();
      playing = false;
    }
});

//Actual music playing component
function playCD(song,name){
    $('.song-name').html(name+'.mp3');
    currentSongIndex = songNames.indexOf(name);
    playing = true;
    playButton.html('<div class="btn" style="background-image: url(\'icons/pause.png\');"></div>');
    
    if (songOnDeck) {
        songOnDeck.off('end'); // Remove 'end' event listener from the current song
        songOnDeck.off('play'); // Remove 'play' event listener from the current song
        songOnDeck.stop();
    }
    
    songOnDeck = song;
    
    songOnDeck.on('play', function() {
        updateSliderAndTime();
    });
    
    //yes for whatever reason u need this twice.
    songOnDeck.on('end', function() {
        playNextSong();
    });
    
    songOnDeck.play();
}
//Call this to update the song Index to the next song and then playCD with that next song in the index
function playNextSong(){
    console.log(playlistLength);
    currentSongIndex++;

    if(currentSongIndex>=playlistLength){
        currentSongIndex=0;
    }
    //console.log(currentSongIndex);
    playCD(songs[songNames[currentSongIndex]],songNames[currentSongIndex]);
};

//After song ends call playnextsong
songOnDeck.on('end', function() {
    playNextSong();
});
//ASSIGNING FORWARD AND BACKSKIPPING
$('#forwardskip').on('click', function(){
    playNextSong();
});

//Backskip is the reverse of playNextSong
$('#backskip').on('click', function(){
    currentSongIndex--;
    if(currentSongIndex<0){
        currentSongIndex=playlistLength-1;
}
    console.log(currentSongIndex);
    playCD(songs[songNames[currentSongIndex]],songNames[currentSongIndex]);
});



//SLIDER STUFF
// Update song's current time when the slider's value is changed by the user
timelineSlider.on('input', function() {
    let newTime = timelineSlider.val() / 100 * songOnDeck.duration();
    songOnDeck.seek(newTime);
});     
// Update slider's position and time display every second while the song is playing
songOnDeck.on('play', function() {
    updateSliderAndTime();
});
// Helper function to format time in mm:ss format
function formatTime(seconds) {
let minutes = Math.floor(seconds / 60);
let secs = Math.floor(seconds % 60);
if (secs < 10) {
secs = '0' + secs;
}
return minutes + ':' + secs;
}
// Helper function to update slider's position and time display
function updateSliderAndTime() {
    let currentTime = songOnDeck.seek();
    let totalTime = songOnDeck.duration();
    timelineSlider.val(currentTime / totalTime * 100);
    songTimeDisplay.text(formatTime(currentTime) + ' / ' + formatTime(totalTime));
    if (songOnDeck.playing()) {
    setTimeout(updateSliderAndTime, 1000);  // Update every second
    }
}
}, 1000); // 1000 milliseconds = 1 second delay
});
