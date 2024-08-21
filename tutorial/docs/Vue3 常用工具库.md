# Vue3 常用工具库

> 本文所有源码均在：https://github.com/Sunny-117/tiny-vue/tree/main/tutorial

# vueuse

VueUse 是一个基于 Vue 组合式 API 的工具库，里面提供了一系列高效、易用的组合函数，用于简化 Vue 开发，节省开发时间。

Vue官网：https://vueuse.org/

VueUse 主要特点：

1. 丰富的组合函数
2. TS支持
3. 轻量级
4. 良好的文档

VueUse里面有很多的 [分类](https://vueuse.org/functions.html)，每个分类下面又有各种丰富的 API：

1. 浏览器 API
   - useFetch：用于发起 HTTP 请求，类似于浏览器的 fetch API。
   - useClipboard：用于操作剪贴板，例如复制文本。
   - useLocalStorage：简化 localStorage 的使用。
   - ......
2. 状态管理
   - useToggle：一个简单的开关状态管理工具。
   - useCounter：用于计数的状态管理工具。
   - .....
3. 传感器
   - useMouse：追踪鼠标的位置和状态。
   - useGeolocation：获取地理位置信息。
4. 用户界面
   - useFullscreen：控制元素的全屏状态。
   - useDark：检测和切换暗模式。
5. 工具函数
   - useDebounce：提供防抖功能。
   - useThrottle：提供节流功能。

## 基本使用

安装：

```bash
npm install @vueuse/core
```

然后就可以在项目中引入并使用：

```vue
<template>
  <div>{{ x }}</div>
  <div>{{ y }}</div>
</template>

<script setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<style scoped></style>
```



**综合示例：待办事项**

要求：用到两个 VueUse 里面的工具方法：useLocalStorage、useToggle


# vuedraggable

vuedraggable 是一个基于 Sortable.js 的 Vue 组件，用于实现拖拽和排序功能。它可以让你在 Vue 应用中轻松地实现拖拽排序，并提供了丰富的配置选项和事件来控制拖拽行为。

>Sortable.js 是一个轻量级的 JS 库，用于实现拖拽排序功能。它支持 HTML5 的拖拽 API，并提供了丰富的选项和事件，可以轻松地在网页中实现拖拽排序、拖拽交换等功能。Vue.Draggable 是基于 Sortable.js 构建的，用于在 Vue 应用中实现这些功能。
>
>Sortable.js 的特点：
>
>1. 轻量级：Sortable.js 非常轻量，核心库只有几千字节。
>2. 高性能：利用现代浏览器的 HTML5 拖拽 API，提供高性能的拖拽体验。
>3. 多样的选项：提供丰富的选项和回调函数，可以自定义拖拽行为。
>4. 多种场景：支持多种拖拽场景，包括列表排序、网格布局、分组拖拽等。
>5. 与框架集成：容易与主流前端框架集成，如 Vue、React、Angular 等。



**基本使用**

首先安装这个库：

```bash
npm install vuedraggable@4.0.0
```

注意在安装的时候，一定要指定安装的版本为 4.0.0

安装后可以从这个库中导入一个**组件**：

```vue
<template>
  <draggable 
     v-model="myArray" 
     group="people" 
     @start="drag=true" 
     @end="drag=false" 
     itemKey="id"
   >
    <template #item="{ element }">
      <div class="task">{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'
</script>
```

这是 vuedraggable 的一个标准用法。

1. v-model="myArray"：数组包含了需要拖拽排序的元素。
2. group="people"：group 属性用于配置**分组**，相同 group 名称的 draggable 实例之间允许相互拖拽元素。
3. @start="drag=true"：当拖拽操作开始时触发，这里将 drag 变量设置为 true，这可以用于在拖拽开始时触发一些行为，比如改变样式或显示一些提示。
4. @end="drag=false"：当拖拽操作结束时触发，这里将 drag 变量设置为 false



**实战案例**

一个“未完成”列表和一个“已完成”列表，两个列表之间的项目可以自由拖动。


# vue-drag-resize

vue-drag-resize：和拖拽相关的库

- vuedraggable：主要用于列表项的拖拽排序。
- vue-drag-resize：主要用于需要用户交互调整大小和位置的元素，如看板、图表、可视化编辑器等。

**基本使用**

安装这个库：

```bash
npm install vue-drag-resize
```

安装的版本信息："vue-drag-resize": "^1.5.4"

接下来从 vue-drag-resize/src 中可以导入一个**组件 VueDragResize**，该组件提供一个插槽，可以存放要 resize 的模板内容。

基本示例核心代码：

```vue
<template>
  <div id="app">
    <VueDragResize
      :w="200"
      :h="150"
      :x="100"
      :y="100"
      :min-width="50"
      :min-height="50"
      @resizing="resizeHandle"
      @dragging="() => console.log('拖拽中')"
    >
      <div class="content">可拖拽和调整大小的元素</div>
    </VueDragResize>
  </div>
</template>

<script setup>
// 注意，这里是从vue-drag-resize下面的src目录导出的组件
import VueDragResize from 'vue-drag-resize/src'

const resizeHandle = (size) => {
  console.log('调整了元素大小')
  console.log(size)
}
</script>
```



**场景示例**

用户选择图片，然后可以自由的对图片进行裁剪。


# vue-chartjs

vue-chartjs 是一个用于在 Vue 项目中创建图表的库，它基于 Chart.js 构建。Chart.js 是一个简单而灵活的 JS 图表库，提供了多种类型的图表。vue-chartjs 提供了与 Vue 的无缝集成，让在 Vue 应用中创建和管理图表变得更加方便。

vue-chartjs 的特性：

1. 与 Chart.js 集成
2. 响应式图表
3. 可定制性
4. 组件化

**快速上手**

首先安装这个库：

```bash
npm i vue-chartjs chart.js
```

安装的版本信息：

-  "chart.js": "^4.4.3"
-  "vue-chartjs": "^5.3.1"

基础示例核心代码：

```vue
<template>
  <Bar :data="data" :options="options" />
</template>

<script setup>
import { ref } from 'vue'
// 接下来需要从 chart.js 里面引入一些组件
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

// 首先需要注册从 chart.js 引入的组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = ref({
  // 图表的X轴
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: '月份销售数据',
      backgroundColor: '#f87979', // 数据集的背景颜色
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11] // 数据集的数据(Y轴)
    }
  ]
})

const options = ref({
  responsive: true // 响应式，图表会根据容器大小自动调整
})
</script>
```

核心：

1. 从 chartjs 里面引入一组组件，进行注册
2. 从 vue-chartjs 里面导入图表组件，一般需要传入的参数：data、options



**其他细节**

**1. 有哪些图形**

vue-chartjs 基于 Chart.js，因此支持 Chart.js 提供的所有图表类型。以下是 Chart.js 提供的图表类型，这些图表类型在 vue-chartjs 中也可以使用：

- Line Chart（折线图）
- Bar Chart（柱状图）
- Radar Chart（雷达图）
- Doughnut Chart（圆环图）
- Pie Chart（饼图）
- Polar Area Chart（极地区域图）
- Bubble Chart（气泡图）
- Scatter Chart（散点图）

**2. 注册组件是什么意思**

注册组件代码：

```js
ChartJS.register(ArcElement, Title, Tooltip, Legend);
```

这是因为从 Chart.js 4.x 版本开始采用模块化设计，以减少最终构建的文件大小，并提高性能。每个图表被分为了多个组件，为了让这些组件在图表中生效，需要在使用之前将它们注册到 Chart.js 中。

**3. options有哪些配置项**

[vue-chartjs官网](https://vue-chartjs.org/)

[Chart.js官网](https://www.chartjs.org/docs/latest/) 

**4. 使用插件**

Chart.js 配置项里面其中的一项，是配置插件：

```js
const config = {
  type: 'line',
  data: {},
  options: {},
  plugins: []
}
```

vue-chartjs 自然也支持插件机制。

使用插件示例：缩放插件（chartjs-plugin-zoom）用于在图表中添加缩放和平移功能。

# 「❤️ 感谢大家」

如果你觉得这篇内容对你挺有有帮助的话：
点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -\_-）欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。觉得不错的话，也可以阅读 Sunny 近期梳理的文章（感谢掘友的鼓励与支持 🌹🌹🌹）：

**我的博客：**

**Github：**[**https://github.com/sunny-117/**](https://github.com/sunny-117/)

**前端八股文题库：**[https://sunny-117.github.io/blog/](https://sunny-117.github.io/blog/)

**前端面试手写题库：**[https://github.com/Sunny-117/js-challenges](https://github.com/Sunny-117/js-challenges)

**手写前端库源码教程：**[https://sunny-117.github.io/mini-anything](https://sunny-117.github.io/mini-anything/)

**热门文章**

- [✨ 爆肝 10w 字，带你精通 React18 架构设计和源码实现【上】](https://juejin.cn/spost/7381371976035532835)
- [✨ 爆肝 10w 字，带你精通 React18 架构设计和源码实现【下】](https://juejin.cn/spost/7381395976676196387)
- [前端包管理进阶：通用函数库与组件库打包实战](https://juejin.cn/post/7376827589909266458)
- [🍻 前端服务监控原理与手写开源监控框架 SDK](https://juejin.cn/post/7374265502669160482)
- [🚀 2w 字带你精通前端脚手架开源工具开发](https://juejin.cn/post/7363607004348989479)
- [🔥 爆肝 5w 字，带你深入前端构建工具 Rollup 高阶使用、API、插件机制和开发](https://juejin.cn/post/7363607004348923943)
- [🚀 Rust 构建简易实时聊天系统](https://juejin.cn/post/7389952004792434688)

**专栏**

- [精通现代前端工具链及生态](https://juejin.cn/column/7287224080172302336)
- [Vue 3 设计哲学与源码揭秘](https://juejin.cn/column/7391745629876830208)
- [esbuild 原理与应用实战](https://juejin.cn/column/7285233095058718756)
- [js-challanges 题解来了，迎接你的校招提前批](https://juejin.cn/column/7244788137410560055)
