import React from 'react'
import lineBreak from './lineBreak'

export default function({ content }){
    content = lineBreak(content) + '<br>'
    return (
        <span 
            dangerouslySetInnerHTML={{__html: content}}>
        </span>
    )
}
//style={{backgroundColor:'#ececec',color:'#ececec'}} 