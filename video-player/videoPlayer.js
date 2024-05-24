document.addEventListener('videoDirectoryClickFromP',function(e){
    vid=e.detail;

    $('body').html(`<iframe width="560" height="315" src="${vid.vidLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe`);
  });