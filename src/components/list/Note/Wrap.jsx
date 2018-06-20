import React from 'react'
import { Model } from 'dva'
class NoteWrap extends React.Component {
    constructor(props) {
        super(props)
        this.ref = {}
        this.flag = false
    }
    componentDidMount() {
        /* 
        this.props.value的值，传入函数，就不能变了
        要引用传递不要按值传递
        */
    }
    render() {
        const click = (e) => {
            this.props.clickNote(this.props.note)
            e.stopPropagation()
            e.preventDefault()
        }
        const del = (e) => {
            let text = this.props.note.content.slice(0,30)
            text = text.replace(/\n/g, ' ') 
            text = text.replace(/\r/g, '')             
            if(confirm(`要删除"${text}"吗？`)) {
                Model.dispatch({ type: 'list/deleteNote', id: this.props.note.itemId })
                Model.dispatch(({ type: 'list/remove', itemId: this.props.note.itemId }))
            }
            e.stopPropagation()
            e.preventDefault()
        }
        return (
            <div onClick={click}>
                <div
                    ref={ref=>{ this.ref = ref }}
                    style={{
                        userSelect:'none',
                        fontSize:'16px',
                        lineHeight:'1.5',
                        minHeight:'50px',
                        padding:'15px 10px 15px 10px'
                    }} 
                >
                    {this.props.children}
                </div>
                <div style={{widht:'100%',height: '1px',borderBottom:'0.5px solid #ccc',textAlign:'right',color:'#e2e2e2'}}>
                    <span onClick={del} style={{fontFamily: 'fantasy',position:'relative',bottom:'24px',fontSize:'20px',padding: '5px 12px 5px 0px'}}>x</span>
                </div>
            </div>
        )
    }
}
export default NoteWrap