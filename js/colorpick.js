desktopBody=$("body");

colorPickIcon =$("#color-picker");

colorPickerPopup= $("#color-picker-popup")

colors={"#color-option-1":"#87bb93","#color-option-2":"#ff9663","#color-option-3":"#ffb0c9","#color-option-4":"#bebee7"}

function getColorValueByIndex(index) {
    const values = Object.values(colors); // Get an array of values
    if (index >= 0 && index < values.length) {
      return values[index];
    } else {
      return null; // Or throw an error if index is out of bounds
    }
  }


  const randomIndex = Math.floor(Math.random() * Object.keys(colors).length); 

  document.body.style.backgroundColor = getColorValueByIndex(randomIndex); 
  



// Function to toggle the display of an element
function toggleDisplay(element) {
    var currentDisplay = element.css('display'); // Get current display value
    if (currentDisplay === 'none') {
        element.css('display', 'flex'); // Set display to block if it's none
    } else {
        element.css('display', 'none'); // Set display to none otherwise
    }
}


for (let color in colors){
    //assign the colors themselves
    $(color).css("background-color",colors[color])

    //assign the click function to the colors
    $(color).on('click', function(){
        desktopBody.css("background-color", colors[color]);
    });
}
colorPickIcon.on('click', function() {
    toggleDisplay(colorPickerPopup);
});
