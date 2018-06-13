import invariant from 'invariant'

export default function(note,wordList) {
    note = { ...note}
    let content = note.content
    
    wordList.forEach(word=>{
        content = markStep1(content,word.word)
    })
    note.displayContent = markStep2(content)
    return note

    function markStep2(str){
        if(/\s_-_-/g.test(str)) {
            str = str.replace(/\s_-_-/g, `<span class="highlight-font-color">`) //<span style='color:#00a9ff'>            
        }
        if(/-_-_\s/g.test(str)){
            str = str.replace(/-_-_\s/g, '</span>') //`</span>` 
        }
        return str
    }

    function markStep1(str,keyword){
        try {
            const reg = new RegExp("(" + keyword + ")", "g")
            const newstr = str.replace(reg, " _-_-$1-_-_ ") 
            return newstr
        }
        catch(err){
            return str
        }
    }
}

// while(/\s_-_-/g.test(str)){
//     str = str.replace(/\s_-_-/g, `<span class="highlight-font-color">`) //<span style='color:#00a9ff'>
// }
// while(/-_-_\s/g.test(str)){
//     str = str.replace(/-_-_\s/g, '</span>') //`</span>` 
// }
