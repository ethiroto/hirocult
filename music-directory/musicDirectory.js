
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

