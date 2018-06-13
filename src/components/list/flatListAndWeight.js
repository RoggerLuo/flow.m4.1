
export default function(res) {
    const wordList = []
    res.forEach(el => {
        el.forEach((wordEntry,ind) => {
            if(wordList.indexOf(wordEntry.word) === -1){ // 去重
                wordList.push({ word: wordEntry.word, weight: Math.pow((16-ind),3) })    
            }
        })
    })
    return wordList
}