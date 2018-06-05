import invariant from 'invariant'

export default function(interfaces){
    invariant(typeof(interfaces)=='object','interfaces的唯一参数应该为对象')
    const deliver = _goods => {
        invariant(typeof(_goods)=='object','deliver的唯一参数应该为对象')
        Object.keys(_goods).forEach(key=>{
            interfaces[key] = _goods[key]
        })
    }
    return deliver
}
