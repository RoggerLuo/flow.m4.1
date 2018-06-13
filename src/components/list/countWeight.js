import invariant from 'invariant'

export default function(note,wordList) {
    note = { ...note }
    note.weight = 0
    note._wordList = []
    
    const arr = JSON.parse(note.wordList) 
    arr.forEach(word=>{ // 去重
        if(note._wordList.indexOf(word) == -1){
            note._wordList.push(word)
        }
    })

    wordList.forEach(word=>count(note,word))
    function count(note,word) {
        if(note._wordList.indexOf(word.word) != -1) {
            note.weight += parseInt(word.weight)
            // note._content = note._content.replace(word.word,'')
            // count(note,word) // 不计算重复词语
        }
    }
    // 加上时间权重
    const days = (Date.parse(new Date())/1000 - parseInt(note.modifiedTime))/60/60/24
    if(days <= 30) {
        note.weight += Math.pow((30 - days)/2,2) //最大的为15^2，比word的低了一个幂                
    }
    return note
}
