normalSongNameArray=['makefun','thousand','jawless','2008','guppy'];
SecretSongNameArray=['theEnd','run',]; // TO ADD SONGS ADD A NAME HERE

let songHowlArray = [];
let songNameArray=[];
let songOnDeck = null;
let playing = false;
let currentSongIndex = 0;

let secretContent = `
    <div class="dir-item" id="secret" alt="">
        <img src="icons/folder.png" alt="">
        <span>secret music</span>
    </div>
`;

  function clearDirectory() {
    let directory = $('.directory-content');
    directory.empty(); // This will remove all child elements
}
function siteWork(songArray){
  let directory = $('.directory-content');
  
  //reset everything
  songHowlArray = [];
  songNameArray=[];
  songOnDeck = null;
  playing = false;
  currentSongIndex = 0;

  clearDirectory();
  

songNameArray=songArray; 

console.log(songNameArray);
$('.song-name').html(songNameArray[0]+'.mp3');

$('.song-name').html(songNameArray[0]+'.mp3');

let song1 = new Howl({
  src: ['songs/'+songNameArray[0]+'.mp3'],
  volume: 1.0,
});

let song2 = new Howl({
  src: ['songs/'+songNameArray[1]+'.mp3'],
  volume: 1.0,
});
let song3 = new Howl({
  src: ['songs/'+songNameArray[2]+'.mp3'],
  volume: 1.0,
});
let song4 = new Howl({
  src: ['songs/'+songNameArray[3]+'.mp3'],
  volume: 1.0,
});
let song5 = new Howl({
  src: ['songs/'+songNameArray[4]+'.mp3'],
  volume: 1.0,
});
let song6 = new Howl({
  src: ['songs/'+songNameArray[5]+'.mp3'],
  volume: 1.0,
});

capacitySongHowlArray=[song1,song2,song3,song4,song5,song6];

for (let i = 0; i < songArray.length; i++) { 
    songHowlArray.push(capacitySongHowlArray[i]);
}
//2) THEN TO ADD IT TO THE CAPACITY ADD IT HERE.

for (let i = 0; i < songNameArray.length; i++) {
    directory.append('<div class="dir-item" id="song' + (i + 1) + '"><img src="../img/wincd.png" alt=""><span>'+songNameArray[0]+'.mp3'+'</span></div>');
}


//find the html elemets for the songs
let song1Visual = $('#song1');
let song2Visual = $('#song2');
let song3Visual = $('#song3');
let song4Visual = $('#song4');
let song5Visual = $('#song5');
let song6Visual = $('#song6');

//Adjust the names of the html.
$('#song1 span').html(songNameArray[0]+'.mp3');
$('#song2 span').html(songNameArray[1]+'.mp3');
$('#song3 span').html(songNameArray[2]+'.mp3');
$('#song4 span').html(songNameArray[3]+'.mp3');
$('#song5 span').html(songNameArray[4]+'.mp3');
$('#song6 span').html(songNameArray[5]+'.mp3');
directory.append(secretContent);

songOnDeck = song1;
playing = false;
playButton = $('#play');
timelineSlider = $('#song-timeline');
songTimeDisplay = $('.song-time');
currentSongIndex = 0; // Index of the currently playing song


song1Visual.on('click', function(){
  playCD(song1,songNameArray[0]);
});

song2Visual.on('click', function(){
  playCD(song2,songNameArray[1]);
});
song3Visual.on('click', function(){
  playCD(song3,songNameArray[2]);
});
song4Visual.on('click', function(){
  playCD(song4,songNameArray[3]);
});
song5Visual.on('click', function(){
  playCD(song5,songNameArray[4]);
});
song6Visual.on('click', function(){
  playCD(song6,songNameArray[5]);
});
}

siteWork(normalSongNameArray);


// Play/pause song when the play button is clicked
$(playButton).on('click', '.btn', function(){
  if(playing == false){
    playButton.html('<div class="btn" style="background-image: url(\'icons/pause.png\');"></div>');
    songOnDeck.play();
    playing = true;
  } else {
    playButton.html('<div class="btn" style="background-image: url(\'icons/play.png\');"></div>');
    songOnDeck.pause();
    playing = false;
  }
  });
  
  function playCD(song,name){
    $('.song-name').html(name+'.mp3');
    currentSongIndex = songNameArray.indexOf(name);
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
  
    songOnDeck.on('end', function() {
      playNextSong();
    });
  
    songOnDeck.play();
  }
  
  songOnDeck.on('end', function() {
    playNextSong();
  });
  //SLIDER STUFF:
  
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
  
  
  function playNextSong(){
    currentSongIndex++;
    if(currentSongIndex>=songHowlArray.length){
      currentSongIndex=0;
    }
    console.log(currentSongIndex);
    playCD(songHowlArray[currentSongIndex],songNameArray[currentSongIndex]);
  };
  
  $('#backskip').on('click', function(){
    currentSongIndex--;
    if(currentSongIndex<0){
      currentSongIndex=songHowlArray.length-1;
    }
    console.log(currentSongIndex);
    playCD(songHowlArray[currentSongIndex],songNameArray[currentSongIndex]);
  });
  
  $('#forwardskip').on('click', function(){
    playNextSong();
  });

//Secret Songs

let directory = $('.directory-content');
$('#secret').on('click', function(){
  directory.html('<div><br><div><h1 id="secret-text">Enter Secret Access Code:</h1>');
  directory.append('<input id="secret-input" type="text" name="" placeholder=""></input>');
  directory.append('<button id ="secret-btn">Enter</button>')
});


directory.keydown($("#secret-input"),function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    inputValue=$("#secret-input").val();
    console.log(inputValue);
    checkSecretInput(inputValue);
  }
});

directory.on('click' ,'#secret-btn', function(){
  inputValue=$("#secret-input").val();
  console.log(inputValue);
  checkSecretInput(inputValue);
});

function checkSecretInput(input) {
  if (input == "122523") {
      songOnDeck.stop();
      playButton.html('<div class="btn" style="background-image: url(\'icons/play.png\');"></div>');
      console.log('we are in');
      secretContent = `
      <a class="dir-item" id="secret" alt="" href='index.html'>
          <img src="icons/secret_fold.png" alt="">
          <span>return</span>
      </a>
  `;
      $(".directory-title").html("Secret Directory");
      $(".directory-title").css("margin-left","-55%");
      directory.css("background-color","#e49bff");
      siteWork(SecretSongNameArray);
      // Add any additional code for when the secret is correct here.
  }
  else{
    passwordError();
  }
}

function passwordError(){
  $("#secret-input").val("");
  directory.css("background-color","red");
  $("#secret-text").html("Incorrect Password.")
  setTimeout(function() {
    directory.css("background-color","#86bbb5");
  $("#secret-text").html("Enter Secret Access Code");
}, 1000);

}