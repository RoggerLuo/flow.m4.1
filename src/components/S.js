import React from 'react';

const Search = ({ click }) => {
    return (
        <div 
            style={{
                textAlign:'center',
                position:'fixed',
                bottom:'75px',
                left:'25px',
                backgroundColor:'#108ee9',
                fontSize:'16px',
                lineHeight:'46px',
                height:'46px',
                width:'46px',
                borderRadius:'23px',
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
