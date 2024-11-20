
//Set song names here!!
var songFiles = ['black_ops2','second_nature','let_my_baby_stay','Left-arm-missing','sugar','tears','half-awake','pastlife','pothol','u-f-o'];

//This sends it to localStorage as a JSON string of the array (parse it in the musicPlayer Script)
localStorage.setItem('songFiles', JSON.stringify(songFiles));
function siteWork(songArray) {
    let directory = $('.directory-content');
    // Append song divs to the directory
    songArray.forEach(function(songName, index) {
        var songDiv = $('<div class="dir-item" id="song' + (index + 1) + '"><img src="../img/wincd.png" alt=""><span>' + songName + '.mp3' + '</span></div>');
    
        // Attach click handler to each song div
        songDiv.on('click', createClickHandler(index + 1, songName));
        
        // Add the song div to the directory
        directory.append(songDiv);
    });


}

//soundstart hotfix:
var firstClick = true; 
$(window).on('click',function(){
    if (firstClick){
        $('#startupSound')[0].play();
        firstClick = false; // Prevent it from playing again
    }
});


function createClickHandler(songNumber, songName) {
    return function() {
        var songSent = String(songNumber);
        var songNameSent = songName;

        var directoryEvent = new CustomEvent('directoryClick', {
            detail: {
                'songNameSent': songNameSent
            }
        });

        window.parent.dispatchEvent(directoryEvent);
    };
}

siteWork(songFiles);


//SCRIPT FOR ADDING THE MUSIC FOLDER
/*
$('.directory-content').append('<div class="dir-item"><a href="https://open.spotify.com/track/0ioYh442Ruw6iYc1j9vWpJ?si=8105c6dd4b834b0d" target="_blank"class="alert-container" id="released-music-folder"><img src="../img/folder.png" alt=""><span>Released Music</span></div></a>');



$(document).ready(function() {
    function applyTargetBlank() {
      if ($(window).width() > 768) { // Change the width as needed
        $('#released-music-folder').attr('target', '_blank');
      } else {
        $('#released-music-folder').on('click',function(){
            parent.location.href = 'https://open.spotify.com/track/0ioYh442Ruw6iYc1j9vWpJ?si=8105c6dd4b834b0d';
        })
        $('#released-music-folder').removeAttr('target');
      }
    }

    // Apply on page load
    applyTargetBlank();

    // Apply on window resize
    $(window).resize(function() {
      applyTargetBlank();
    });
  });

  */