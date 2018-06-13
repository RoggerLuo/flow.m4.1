import React from 'react'
import { SearchBar, Tag } from 'antd-mobile'
import { close } from 'components/searchPanel'
import { Model } from 'dva'

export default function({ visibility, children, interfaces, search, text }) {
    let searchBarStyle = { height: '44px', width: '100%', transition: 'all .3s ease-out', position: 'fixed', top:'-44px' }
    let wrapStyle = { transition: 'all .3s ease-out',backgroundColor:'rgba(236, 236, 236, 0.9)',position:'fixed', top:'100%',bottom:'0',left:'0', right:'0' }
    if(visibility) {
        searchBarStyle = { ...searchBarStyle, top: '0' }
        wrapStyle = { ...wrapStyle, top:'44px' }
    }
    return (
        <div>
            <div style={searchBarStyle}>
                <SearchBar 
                    value={text}
                    onChange={val=>Model.change('searchPanel','text',val)}
                    onSubmit={search}
                    onBlur={close} 
                    ref={ref=>{ Model.change('searchPanel','ref',ref)}}
                    placeholder="Search" maxLength={8} 
                />
            </div>
            <div style={wrapStyle}>
                <div id="search-wrapper" style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                    { children }
                </div>
            </div>
        </div>
    )
}
//interfaces.searchInput = ref