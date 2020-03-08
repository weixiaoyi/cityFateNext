1.关于Taro-UI 在引入全局 scss 的时候会报路径找不到，关于这个问题issue里面也有，
这个属于还没适配Taro Next吧。然后 Taro 的交流群也给出了解决方案
```
来自Taro开发交流群@Goodman

taro next的taro-ui 问题，临时修复方法
package.json更新依赖：taro-ui: NervJS/taro-ui#next

{
"dependencies": { "taro-ui": "NervJS/taro-ui#next" }
}
复制 cp -r ./node_modules/taro-ui/src ./src/taro-ui
修改 config/index.js

const path = require('path')
const config = {
  alias: {
    "taro-ui": path.resolve(__dirname, '../src/taro-ui'),
    "nervjs": path.resolve(__dirname, '../node_modules/react')
  },
}
我试了一下，确实是可以用的，不过AtCalendar这个组件报

Module not found: Can't resolve 'dayjs' in 'src/taro-ui/components/calendar'
暂时先注释掉了这个组件

执行 npm i dayjs 就可以了

```

"taro-ui": "https://github.com/NervJS/taro-ui.git#next"
