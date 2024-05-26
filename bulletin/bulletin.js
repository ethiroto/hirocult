$(document).ready(function() {
    function applyTargetBlank() {
      if ($(window).width() > 768) { // Change the width as needed
        console.log('yo');
        $('.alert-container').attr('target', '_blank');
      } else {
        $('.alert-container').removeAttr('target');

        $('.alert-container').on('click',function(){
            parent.location.href = 'https://open.spotify.com/track/7yaguJ94pkJ56uGBEgM7wJ?si=85b17335ddf74689';
        })
      }
    }

    // Apply on page load
    applyTargetBlank();

    // Apply on window resize
    $(window).resize(function() {
      applyTargetBlank();
    });
  });