import React from 'react'
import './style.css'
// import components from './components'
// import onSearchInput from './onSearchInput'
// import getSimilarNotes from './getSimilarNotes'
// import toggle from './toggle'

// global.flow = global.flow || {}
// global.flow.search = { onSearchInput, getSimilarNotes, components, toggle }
import { SearchBar, Tag } from 'antd-mobile'///lib/search-bar'
//import 'antd-mobile/lib/search-bar/style' ///index.css

export default function() {
    function onChange(){}
    return (
        <div>
            <div className="tag-container">
                <Tag onChange={onChange}>Callback</Tag>
                <Tag onChange={onChange}>Callback</Tag>
            </div>
        </div>
    )
}
//            <SearchBar placeholder="Search" maxLength={8} />
