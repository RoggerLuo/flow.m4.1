import React from 'react'

export function getInitNotes(){
    const arr = []
    for (var i = 10 - 1; i >= 0; i--) {
        arr.push({itemId:1,content:'<span style="background-color:#ececec;color:#ececec;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>'})
    }
    return arr
}
function lineBreak(str){
    try {
        if(/\n/g.test(str)) {
            str = str.replace(/\n/g, `<br>`)
        }
    }
    catch(err){
        console.log(err)
        return str
    }
    return str
}

export default function({ content }){
    content = lineBreak(content) + '<br>'
    return (
        <span 
            style={{backgroundColor:'#ececec',color:'#ececec'}} 
            dangerouslySetInnerHTML={{__html: content}}>
        </span>
    )
}
