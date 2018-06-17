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
            这里不能写 const note = this.props.note,
            删除了note之后，wrap的值和coreNote的值就不同了,
            一直是第一次mount时的值

            因为this.props会实时更新的，
            需要在每次touchstart的时候 重新获取值，
        */
        // this.ref.addEventListener('touchstart', (event) => {
        //     if(this.flag) {
        //         this.props.edit(this.props.note)
        //         this.flag = false
        //     }else{
        //         this.flag = true
        //         setTimeout(()=>{this.flag=false}, 300) //长按时间超过800ms，则执行传入的方法                
        //     }
        // }, { passive: true })
    }
    render() {
        const click = (e) => {
            this.props.edit(this.props.note)

            // if(this.flag) {
            //     this.props.edit(this.props.note)
            //     this.flag = false
            // }else{
            //     this.flag = true
            //     setTimeout(()=>{this.flag=false}, 300) //长按时间超过800ms，则执行传入的方法                
            // }
            // e.stopPropagation()
            // e.preventDefault()
        }
        const del = () => {
            if(confirm(`要删除"${this.props.note.content.slice(0,15)}"吗？`)) {
                Model.dispatch({ type: 'list/deleteNote', id: this.props.note.itemId })
                Model.dispatch(({ type: 'list/remove', itemId: this.props.note.itemId }))
            }
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