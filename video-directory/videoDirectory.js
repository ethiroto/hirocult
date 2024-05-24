videoContainer=$('.video-container');

videoList=[];

function addVideo(videoName,videoLink){
    const newVideo={id:videoList.length+1,name: videoName,link:videoLink}
    videoList.push(newVideo);
}

addVideo('Automatic','https://www.youtube.com/embed/BXYjJ5zIrAQ?si=29ITQCrqfmCXf0tG')
addVideo('dreams','https://www.youtube.com/embed/z63cjCbOU8I?si=P1bUz7BtsQ0StKQ7');
addVideo('moron','https://www.youtube.com/embed/Aux_E9aJJic?si=-LC2_h63Ma5QzidX');


console.log(videoList);

for (let vid of videoList) {
    videoContainer.append(`<div class="video" id="${vid.id}"><img src="../img/video_icon.png" alt=""> ${vid.name}.mp4</div>`);
}

videoContainer.on('click','.video',function(){
    vidSelected=videoList[this.id-1];
    vidSend(vidSelected.name,vidSelected.link);
})

function vidSend(videoName, videoLink) {
    var videoDirectoryEvent = new CustomEvent('videoDirectoryClick', {
        detail: {
            'vidName': videoName,
            'vidLink': videoLink
        }
    });

        window.parent.dispatchEvent(videoDirectoryEvent);
    };
