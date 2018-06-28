## 6月26日update
-  改进dva代码组织形式(composeReducer.js)
-  dva saga增加get方法
-  dva fetch增加两种post mode (拿不到token的根本原因)
-  增加headers配置项 和 动态更新配置


# Basic Usage

```javascript
import dva,{ Fetch } from 'dva'
// 配置一个fetch实例
const fetch = Fetch({ baseUrl: 'http://1.1.1.1:8008' })
// 初始化dva，并向saga的参数中注入fetch
dva.start({ sagaInjection: { fetch } })
```
#Configuration
目前只有`sagaInjection`这一个配置项
#API reference
## Model reduce\change

```javascript
Model.reduce((state)=>{
    return { ...state, index: 1 }
})
```   

## test/inject.js
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

## plugins: keyboard使用示范
```javascript
import { Keyboard } from 'dva'

k = new Keyboard(document.body)
k.keybind(({keyMap,meta,ctrl},catcher)=>{
    catcher(keyMap['n'],{meta,ctrl},(e)=>this.newNote())
    catcher(keyMap['s'],{meta},(e)=>this.saveNote())
    catcher(keyMap['backSpace'],{meta,ctrl},(e)=>this.deleteNote())
})
```
