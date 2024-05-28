
//Set song names here!!
var songFiles = ['star_shaped','wings23','toss_keys'];

//This sends it to localStorage as a JSON string of the array (parse it in the musicPlayer Script)
localStorage.setItem('secretSongFiles', JSON.stringify(songFiles));

//set state of songsUnlocked
var songsUnlocked=false;
localStorage.setItem('unlockedState', JSON.stringify(songsUnlocked));

function clearDirectory() {
    $('.directory-content').empty(); // Clear the directory
}

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

        var directoryEvent = new CustomEvent('secretDirectoryClick', {
            detail: {
                'songNameSent': songNameSent
            }
        });

        window.parent.dispatchEvent(directoryEvent);
    };
}


function unlockSignal() {
    var unlockSignal = new CustomEvent('unlockSignal');
    window.parent.dispatchEvent(unlockSignal);
}



siteWork(songFiles);



//Password:

passwordLock=$('.password-lock');
passwordField=$('#password');
unlockBtn=$("#unlock")
textField=$("#text-field");
helpBtn=$('#help-btn');
helpTxt=$('.help-txt');


unlockBtn.on('click',function(){
    checkPassword();
});

function passwordError(){
    passwordField.val("");
    passwordLock.css("background-color","red");
    $('#errorSound')[0].play();
    $("#text-field").html("Incorrect Password.")
    setTimeout(function() {
      passwordLock.css("background-color","rgb(217 228 255)");
    $("#text-field").html("ENTER SECRET ACCESS CODE TO UNLOCK");
  }, 1000)};



passwordLock.keydown($("#password"),function(event) {
if (event.key === "Enter" || event.keyCode === 13) {
    inputValue=passwordField.val();
    checkPassword(inputValue);
}
});

function checkPassword(){
    if (
        passwordField.val() == "122523" ||
        passwordField.val() == "ascii-grove" ||
        passwordField.val() == "Ascii-grove" ||
        passwordField.val() == "Ascii-Grove" ||
        passwordField.val() == "ascii grove" ||
        passwordField.val() == "Ascii Grove" ||
        passwordField.val() == "Ascii grove" ||
        passwordField.val() == "asciigrove" ||
        passwordField.val() == "AsciiGrove" ||
        passwordField.val() == "Asciigrove" ||
        passwordField.val() == "asciiGrove"
    ) {
        // Add fade-out class to trigger the animation
        passwordLock.addClass('fade-away');
        $('#unlockSound')[0].play();
        var songsUnlocked=true;
        localStorage.setItem('unlockedState', JSON.stringify(songsUnlocked));
        unlockSignal();
        // Remove the element from the DOM after the animation completes
        setTimeout(function() {
            passwordLock.remove();
        }, 1000); // Match this duration with the animation duration
    }
    else{
        passwordError();
        
    }

}

helpBtn.on('click', function() {
    helpTxt.removeClass('fade-out'); // Remove the class to reset the animation
    void helpTxt[0].offsetWidth;     // Trigger a reflow (important for restarting animations)
    helpTxt.addClass('fade-out');    // Add the class back to restart the animation
});

helpBtn.on('mouseenter', function() {
    helpTxt.removeClass('fade-out');
    void helpTxt[0].offsetWidth;
    helpTxt.addClass('fade-out');
});