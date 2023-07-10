window.onload = function() {
  var musicPlayer = document.querySelector('.music-player');
  var playerHeader = document.querySelector('.player-header');
  var directoryWindow = document.querySelector('.directory-window');
  var directoryHeader = document.querySelector('.window-header');

  var highestZIndex = 0; // This variable will keep track of the highest z-index so far.

  var makeDraggable = function(dragHandle, draggable) {
    var startDrag = function(e) {
      e.preventDefault();
      
      // Increase the highest z-index and apply it to the draggable element.
      highestZIndex++;
      draggable.style.zIndex = highestZIndex;

      var startX = e.clientX || e.touches[0].clientX;
      var startY = e.clientY || e.touches[0].clientY;
      var draggableX = draggable.offsetLeft;
      var draggableY = draggable.offsetTop;

      var mouseMoveHandler = function(e) {
        var dx = (e.clientX || e.touches[0].clientX) - startX;
        var dy = (e.clientY || e.touches[0].clientY) - startY;

        draggable.style.left = (draggableX + dx) + 'px';
        draggable.style.top = (draggableY + dy) + 'px';
      }

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('touchmove', mouseMoveHandler);

      var stopDrag = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('touchmove', mouseMoveHandler);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
      }

      document.addEventListener('mouseup', stopDrag, { once: true });
      document.addEventListener('touchend', stopDrag, { once: true });
    }

    dragHandle.addEventListener('mousedown', startDrag);
    dragHandle.addEventListener('touchstart', startDrag);
  };

  makeDraggable(playerHeader, musicPlayer);
  makeDraggable(directoryHeader, directoryWindow);
};
