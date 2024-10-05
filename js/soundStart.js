$(document).ready(function() {
    setTimeout(function() {
      $('#startupSound')[0].play();
      console.log('started!'); 
      $('#startupSound')[0].play();
    }, 5000); // 5000 milliseconds = 5 seconds
  });