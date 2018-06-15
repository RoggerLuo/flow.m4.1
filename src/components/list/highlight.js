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
            str = titleConvert(str,"###",'h4')
            str = titleConvert(str,"##",'h3')
            str = titleConvert(str,"#",'h2')
            const reg = new RegExp("(" + keyword + ")", "g")
            const newstr = str.replace(reg, " _-_-$1-_-_ ") 
            return newstr
        }
        catch(err){
            console.log(err)
            return str
        }
    }
}
// 解析mardown语法的#
function titleConvert(str,marker,substitute){
    const length = marker.length
    let startInd = str.indexOf('\n' + marker)
    if(startInd != -1) {
        startInd = startInd + 1 // 加了一个\n
        if(str.indexOf('\n') == -1) {
            str = str.slice(0,startInd) + `<${substitute}>` + str.slice(startInd+length) + `</${substitute}>`
        }else{
            let newlineInd = startInd + 1
            for (var i = newlineInd; i < str.length; i++) {
                if(str[i] == '\n') {
                    /* 加东西 */
                    str = str.slice(0,i) + `</${substitute}>` + str.slice(i)
                    str = str.slice(0,startInd) + `<${substitute}>` + str.slice(startInd+length)
                    break
                }
            }
        }
        str = titleConvert(str,marker,substitute)
    }    
    // 如果#在第一个
    if(str.indexOf(marker)  == 0){
        if(str.indexOf('\n') == -1) {
            str = `<${substitute}>` + str.slice(length) + `</${substitute}>`
        }else{
            let newlineInd = 1
            for (var i = newlineInd; i < str.length; i++) {
                if(str[i] == '\n') {
                    /* 加东西 */
                    str = str.slice(0,i) + `</${substitute}>` + str.slice(i)
                    str = `<${substitute}>` + str.slice(length)
                    break
                }
            }
        }
    }
    return str
}
