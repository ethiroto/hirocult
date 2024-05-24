$(document).ready(function() {
    // Function to check if a window is off the left side of the screen
    function isWindowOffLeft(windowId) {
      const windowElement = $('#' + windowId);
      const windowOffset = windowElement.offset();
      return windowOffset.left < 0;
    }
  
    // Function to check if a window is off the right side of the screen
    function isWindowOffRight(windowId) {
      const windowElement = $('#' + windowId);
      const windowOffset = windowElement.offset();
      const windowWidth = windowElement.outerWidth();
      const screenWidth = $(window).width();
      return windowOffset.left + windowWidth > screenWidth;
    }
  
    // Function to adjust a window's position if it's off-screen
    function adjustWindowPosition(windowId) {
      const windowElement = $('#' + windowId);
  
      if (isWindowOffLeft(windowId)) {
        windowElement.css({
          left: 0 // Move to the left edge of the screen
        });
      } else if (isWindowOffRight(windowId)) {
        const newLeft = $(window).width() - windowElement.outerWidth();
        windowElement.css({
          left: newLeft // Move to the right edge of the screen
        });
      }
    }
  
    // Function to adjust all window positions
    function adjustAllWindowPositions() {
      $(".basic-window").each(function() {
        const windowId = $(this).attr("id");
        adjustWindowPosition(windowId);
      });
    }
  
    // Debounce function (add this utility outside of the $(document).ready block)
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
  
    // Check and adjust positions on page load
    adjustAllWindowPositions();
  
    // Apply adjustments on window resize (with debouncing)
  });
  