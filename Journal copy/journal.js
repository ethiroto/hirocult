
var entries = [];

class Entry {
    construtor(title,text='', image='none'){
        this.title=title;
        this.text=text;
        this.image=image;
        
    }
}

function addEntry(title,text,image){
    const newEntry = new Entry(title,text,image);
    entries.push(newEntry);
}


