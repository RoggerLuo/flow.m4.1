import React from 'react'
const Add = ({ click }) => {
    return (
        <div 
            style={{
                textAlign:'center',
                position:'fixed',
                bottom:'25px',
                left:'25px',
                backgroundColor:'gold',
                fontSize:'26px',
                lineHeight:'52px',
                height:'52px',
                width:'52px',
                borderRadius:'27px',
                zIndex:1
            }}
            onClick={click}
        >
            +
        </div>
    )
}            
export default Add
