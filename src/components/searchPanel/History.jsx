import React from 'react'
import './style.css'
import { SearchBar, Tag } from 'antd-mobile'

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
