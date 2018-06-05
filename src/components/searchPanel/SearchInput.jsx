import React from 'react'
import { Keyboard } from 'dva'

class SearchInput extends React.Component { 
    constructor(props) {
        super(props)
        this.input = {}
        this.setRef = ref => this.input = ref
    }
    componentDidMount() {
        const keyboard = new Keyboard(this.input)
        const keybind = keyboard.keybind
        this.props.delivery({ keybind })
    }
    render(){
        return (
            <input 
                placeholder="Search..." 
                style={{fontSize:'16px', height: '20px', outline: 'none', padding: '5px',width:'100%'}}
                onChange={this.props.onChange}
                value={this.props.text}
                autosize="true"
                ref={this.setRef} 
                autoFocus={true}
            />
        )
    }
}
export default SearchInput
