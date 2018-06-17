import React from 'react';

const Search = ({ click }) => {
    return (
        <div 
            style={{
                textAlign:'center',
                position:'fixed',
                bottom:'95px',
                left:'25px',
                backgroundColor:'#108ee9',
                fontSize:'16px',
                lineHeight:'52px',
                height:'52px',
                width:'52px',
                borderRadius:'27px',
                color:'white',
                zIndex:1

            }} 
            onClick={click}
        >
            S
        </div>
    )
}            
export default Search
