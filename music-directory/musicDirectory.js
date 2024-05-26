
//Set song names here!!
var songFiles = ['Left-arm-missing','sugar','tears','half-awake','mp3','pothol','dnayy','u-f-o','what_is_this'];

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

/*
$('.directory-content').append('<div class="dir-item"><a href="https://open.spotify.com/track/0ioYh442Ruw6iYc1j9vWpJ?si=8105c6dd4b834b0d" target="_blank"class="alert-container" id="released-music-folder"><img src="../img/folder.png" alt=""><span>Released Music</span></div></a>');



$(document).ready(function() {
    function applyTargetBlank() {
      if ($(window).width() > 768) { // Change the width as needed
        $('#released-music-folder').attr('target', '_blank');
      } else {
        $('#released-music-folder').on('click',function(){
            parent.location.href = 'https://open.spotify.com/track/7yaguJ94pkJ56uGBEgM7wJ?si=85b17335ddf74689';
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