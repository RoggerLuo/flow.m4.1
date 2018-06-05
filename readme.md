## search panel组件
### props

参数  | 说明
------- | -------------
onSearchResult(wordList)  | 拿到搜索返回值时触发,获取到加权之后的wordlist 

	
## list search组件
### api
参数  | 说明
------- | -------------
blur | 把index设置为null，列表中的任何文章都不会被选中 
	
### props
参数  | 说明
------- | -------------
onSelect | 列表选择的时候，传出一个note


## list组件
### api

参数  | 说明
------- | -------------
blur  | 同search list
getData  | 获取列表数据  
fetchData(callback) |callback(可选)将获得一个参数notes(array)
addNote(note) |
modifyNote(note) |
removeNote(itemId) |
### props
参数  | 说明
--- | -------------
onSelect  | 


# editor组件
### props  

参数  | 说明
--- | -------------
onNew(callback)|	不提供任何参数给callback
onSave(callback)|	callback将获得一个参数：note(object)
onDelete(callback) |callback将获得一个参数”itemId(string)

参数  | 说明
--- | -------------
delivery(callback)  | callback将获得一个对象,对象中包括以下属性：
_replace(function)_|_接受一个note对象，替换editor中的内容_

# note 对象规范
{ itemId,content,modifyTime }	
