var bottomBarContentHtml = $('.bottom-bar-content').html();
var bottomBarContent = $('.bottom-bar-content');
var isMobile = false; // Track whether currently in mobile mode

$(document).ready(function() {
  // Function to toggle CSS classes on the body
  function toggleStyles() {
    const body = document.body;

    if (isMobile) { // Using isMobile for consistency
      body.classList.add("mobile");
      body.classList.remove("desktop");
    } else {
      body.classList.remove("mobile");
      body.classList.add("desktop");
    }
  }

  // Function to apply changes based on window size
  function applyChangesForWindowSize() {
    var windowWidth = $(window).width();
    if (windowWidth <= 800) {
      isMobile = true; // Update isMobile
      mobileMode();
    } else {
      isMobile = false; // Update isMobile
      desktopMode();
    }
  }

  // Function to update bottom bar content for mobile
  function mobileMode() {
    bottomBarContent.html('<btn class="bottom-bar-item" id="apps-icon"><img src="img/folder.png" alt="">Apps</btn>');
    toggleStyles(); // Apply styles immediately
  }

  // Function to update bottom bar content for desktop
  function desktopMode() {
    bottomBarContent.html(bottomBarContentHtml);
    toggleStyles(); // Apply styles immediately
  }

  // Apply changes on initial load
  applyChangesForWindowSize();

  // Re-apply changes on window resize (with debouncing for better performance)
  $(window).resize(debounce(applyChangesForWindowSize, 250)); // 250ms debounce
});

// Debouncing function (add this utility outside of the $(document).ready block)
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}



