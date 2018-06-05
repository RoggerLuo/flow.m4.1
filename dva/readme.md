
## deliver interface
传入一个interfaces对象,  
返回deliver方法，  
依赖于引用传递，通过函数包裹的方式来使用

```javascript
() => interfaces.someMethod()
```   

## keyboard使用示范
```javascript
import { Keyboard } from 'dva'

k = new Keyboard(document.body)
k.keybind(({keyMap,meta,ctrl},catcher)=>{
    catcher(keyMap['n'],{meta,ctrl},(e)=>this.newNote())
    catcher(keyMap['s'],{meta},(e)=>this.saveNote())
    catcher(keyMap['backSpace'],{meta,ctrl},(e)=>this.deleteNote())
})
```
## test-helper.js
注入`dva`和`dvaStatic`两个全局变量,  
使用`dva.test`来构建测试,  
示例：  

```javascript
const Xss = dvaStatic.Xss
dva.test('Xss', (t) => {
    const string = 'test<a>testatesta'
    t('translated string',()=>{
        return Xss.escape(string) === 'test&lt;a&gt;testatesta' 
    })
})
```