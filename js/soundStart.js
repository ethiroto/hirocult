$(document).ready(function() {
    setTimeout(function() {
      $('#startupSound')[0].play();
    }, 1000); // 5000 milliseconds = 5 seconds
  });

$('.basic-window').on('click'){
    $('#startupSound')[0].play();
};

