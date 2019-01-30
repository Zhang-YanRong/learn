# pixi学习笔记

### 配置
运行必须要有web服务器

### 安装
``` bash
<script src="pixi.min.js"></script>
```
//安装正常（在浏览器控制台中会打印下面的一行）
``` bash
 PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥ 
```

### 创建Pixi应用程序和stage
Pixi有一个Application，会选择用canvas还是WebGL去渲染图像（取决于正在使用的浏览器支持哪一个），然后需要创建一个Container（特殊的Pixi对象stage）,这个stage对象将作为根容器。

//示例
``` bash
//创建一个Application
let app = new PIXI.Application({
    width: 256,          //default: 800
    height: 256,         //default: 600
    antialias: true,     //default: false 使字体边界和几何图形更加圆滑
    transparent: false,  //default: false 设置canvas的透明度
    resolution: 1        //default: 1 让Pixi在不同的分辨率和像素密度的平台上运行变得简单
    foreCanvas: true     //default: false 强制抛弃WebGL，只用canvas
})
//将Application转化的canvas添加到页面中
document.body.appendChild(app.view)
```

### renderer
##### 创建画布之后想改变背景色设置app.renderer对象的backgroundColor属性为一个十六进制的颜色：
``` bash 
app.renderer.backgroundColor = 1x245628
```

##### 重新设置画布宽高
``` bash
app.renderer.view.width = 200
//该方法也可以获取画布的宽高
console.log(app.renderer.view.width)
```
``` bash
app.renderer.autoResize = true
app.renderer.resize(512,512)
```
##### 让canvas占据整个窗口
``` bash 
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth,window.innerHeight);
```
//注：padding和margin都设置成0

##### 让canvas在任何浏览器中统一尺寸

### Pixi sprites

有了画布，想显示图像就必须运用stage对象。stage是Pixi的一个Container（容器）对象，所有要显示的东西都要放在stage中。
Pixi拥有一个sprites类来创建游戏精灵，有三种主要的方法来创建：
* 用一个但图像文件创建
* 用一个雪碧图（tileset）上的子图来创建
* 从一个纹理（texture ）贴图集中创建（纹理贴图集就是用JSON定义了图像大小和位置的tileset）

### 将图片加载到纹理（texture）缓存中
因为Pixi用WebGL和GPU去渲染图像，所以图像需要转化成GPU可以处理的版本。
> 可以被GPU处理的图像被称作 纹理（texture）
> 在让精灵（sprites）显示图片之前，要将图片转化成WebGL纹理
> 为了提高效率，Pixi使用纹理缓存来存储和引用所有的纹理
``` bash
//用WEBGL兼容的格式存储纹理
let texture = PIXI.utils.TexturnCache["img/11.png"]
//使用Pixi的sprite来创建一个新的sprite来使用纹理
let sprite = new PIXI.Sprite(texture)
```
##### 用loader加载图像并转化成纹理
loader可以加载任何图像资源
``` bash
PIXI.loader.add("img/11.png").load(setup)
function setup(){
    //这里是loader加载完成后的回调函数
    //创建一个精灵（sprite）来连接loader的sesources对象
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources["./img/11.png"].texture
    )
    //让sprite显示
    app.stage.addChild(sprite)
}
```

##### add用法
1.链式
``` bash
PIXI.loader
    .add('./img/1.png')
    .add('./img/2.png')
    .load(steup)
```
2.数组
``` bash
PIXI.loader
    .add([
        './img/1.png',
        './img/2.png'
    ])
    .load(steup)
```

### 显示 sprite
`app.stage.addChild(sprite) `
**stage 是用来包裹你所有精灵的主要容器**