import React from 'react'

class Stateful extends React.Component { 
    constructor(props) {
        super(props)
        this.ref = {}
    }
    componentDidMount(){
        const handler = function (event) {
           event.preventDefault()
           event.stopPropagation()
        }
        const dom = document.getElementById("search-wrapper")
        dom.addEventListener("touchmove",handler,false) //这里要用false，用passive会出问题，具体原因不知道
    }
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default Stateful
// ref={ref=>{ this.ref = ref }}