/* kvData = [{ word, timestamp }] */
export default function(kvData){
    const finalObject = {}  
    kvData.forEach(entry=>{
        entry.count = 0
        if(!finalObject[entry.word]) {
            finalObject[entry.word] = 0
        }
    })
    let now = Date.parse(new Date())/1000
    calWeight(now-1*24*60*60,now)
    calWeight(now-4*24*60*60,now-1*24*60*60)
    calWeight(now-16*24*60*60,now-4*24*60*60)
    calWeight(now-64*24*60*60,now-16*24*60*60)
    
    return Object
        .keys(finalObject)
        .map(key=>({ word: key, value: finalObject[key] }))
        .sort((a,b)=>b.value-a.value)
     
    function calWeight(timestart,timeend){
        const arr = []
        kvData.forEach(entry=>{
            const t = parseInt(entry.timestamp) 
            if(timestart < t <= timeend) { //对符合条件的history进行分时段 累计
                const exist = arr.some(e=>{
                    if(e.word==entry.word){
                        e.count += 1
                        return true
                    }
                })
                if(!exist) {
                    arr.push(entry)                            
                }
            }
        })
        arr.sort((a,b)=> a.count - b.count) // 每个时段中，按搜索次数从低到高排序
        arr.forEach((entry,ind)=>{ // 加回最终的数组
            finalObject[entry.word] += ind
        })
    }
}