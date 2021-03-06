export function set(value){
    const arr = value.split(' ')
    let _searchHistory = localStorage.getItem('_searchHistory')
    let object
    if(!_searchHistory) {
        object = {}
    }else{
        object = JSON.parse(_searchHistory)
    }
    arr.forEach(word=>{
        if(object[word]) {
            object[word] += 20
        }else{
            object[word] = 20
        }        
    })
    Object.keys(object).forEach(key=>{
        object[key] -= 1
    })    

    localStorage.setItem('_searchHistory',JSON.stringify(object))
}


export function get(){
    const _searchHistory = localStorage.getItem('_searchHistory')
    if(!_searchHistory) return []
    const history = JSON.parse(_searchHistory)
    return Object
        .keys(history)
        .map(key=>({ word:key, count:history[key] }))
        .sort((a,b)=> b.count - a.count)
        .map(entry=>entry.word)
}