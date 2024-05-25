$(function() {
    // Create Draggable instances for each .basic-window
    $(".basic-window").each(function() {
        var windowElement = this; // The specific .basic-window element


        Draggable.create(windowElement, {
            type: "x,y",
            trigger: $(windowElement).find(".window-drag-area")[0], // Use only the .window-header within this .basic-window as the trigger
            onPress: function() {
                // Add overlay on press and change cursor on the fly
                $('body').append('<div id="drag-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999; cursor: default;"></div>');
                $(windowElement).css('cursor', 'default'); // Set cursor to default during drag
                highestZIndex+=1;
                $(this.target).css('z-index', highestZIndex);
            },
            onRelease: function() {
                $('#drag-overlay').remove();
                $(windowElement).css('cursor', ''); // Reset cursor to initial state when drag ends
            }
        });
        //THIS IS SO IF THE BORDER GETS CLICKED (or anywhere on the window, it jumps to the top)
        $(windowElement).on('click', function() {
            highestZIndex += 1;
            $(this).css('z-index', highestZIndex);
        });
    });
});

