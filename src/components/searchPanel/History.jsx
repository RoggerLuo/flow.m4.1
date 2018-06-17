import React from 'react'
import './style.css'
import { set, get } from './localStorage'
const data = get()
export default function({onClick}) {
    return (
        <div className="tag-container">
            {data.map((word,ind)=>{
                return (
                    <div onClick={(e)=>onClick(e,word)} style={{padding:"5px 10px", color:"#888888"}} key={ind}>
                        {word}
                    </div>
                )
            })}
        </div>
    )
}
