//I made a special id just for the music directory close button

firstClick=true;
$('#music-directory-close').on('click',function(){
    console.log('music directory close clicked');
    if (firstClick){
        $('#startupSound')[0].play();
        firstClick = false; // Prevent it from playing again
    }
});

