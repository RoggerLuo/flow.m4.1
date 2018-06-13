import React from 'react'
const Add = ({ click }) => {
    return (
        <div 
            style={{
                textAlign:'center',
                position:'fixed',
                bottom:'15px',
                left:'25px',
                backgroundColor:'gold',
                fontSize:'26px',
                lineHeight:'46px',
                height:'46px',
                width:'46px',
                borderRadius:'23px',
                zIndex:1
            }}
            onClick={click}
        >
            +
        </div>
    )
}            
export default Add
