# DOM尺寸计算：

## 盒子模型

### 标准模型

### 怪异模型

## offset系列

### [1] offsetWidth： width + padding + (滚动条) + border

HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。一个典型的（译者注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
border-box 的宽度

### offsetLeft

#### 定位类型

- 定位元素（positioned element）是其计算后位置属性为 relative, absolute, fixed 或 sticky 的一个元素。
- 相对定位元素（relatively positioned element）是计算后位置属性为 relative 的元素。
- 绝对定位元素（absolutely positioned element）是计算后位置属性为 absolute 或 fixed 的元素。
- 粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。

大多数情况下，height和width 被设定为auto的绝对定位元素，按其内容大小调整尺寸。但是，被绝对定位的元素可以通过指定top和bottom ，保留height未指定（即auto），来填充可用的垂直空间。它们同样可以通过指定left 和 right并将width 指定为auto来填充可用的水平空间。

除了刚刚描述的情况（绝对定位元素填充可用空间）：

如果top和bottom都被指定（技术上，而不是auto），垂直居中。
如果指定了left 和right两侧，则水平居中。

#### HTMLElement.offsetParent

HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素（标准模式下为 html； quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。

#### 描述

### offsetTop

## clientWidth: width + padding

Element.clientWidth 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。

## scrollWidth

元素的scrollWidth只读属性以px为单位返回元素的内容区域宽度或元素的本身的宽度中更大的那个值。若元素的宽度大于其内容的区域（例如，元素存在滚动条时）, scrollWidth的值要大于clientWidth。
