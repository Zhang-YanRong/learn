# defineProperty
``` bash
为学习vue源码而必须了解的es5
```

### Object.defineProperty 定义对象属性
``` javascript
    let obj = {
        data:[1,2,3]
    }

    //给obj增加属性
    Object.defineProperty(obj,'msg',{
        value:'这是msg属性值'
    })

    console.log(obj) -> {data: Array(3), msg: "这是定义msg的值"}
```

### Object.defineProperty(obj,name，config) 

> 1. obj 表示已有的对象

> 2. name 表示要给该对象添加的属性名（在该对象中不存在的）

> 3. config 表示该属性的一些访问及权限的配置

##### config 属性配置项
> configurable：默认false,当为true时，该属性才能被删除

> enumerable：默认false,当为true时，该属性才能被枚举和访问

> writable：默认false,当为true时，该属性才能被赋值运算符修改

> value：该属性的值,默认undefind

> get：给属性提供getter，在访问该属性时会调用该方法

> set：给属性提供setter，在修改该属性时会调用该方法

注：`get/set 方法 与 value 二者不能同时设置`

``` javascript
    let obj = {
        data:[1,2,3]
    }

    Object.defineProperty(obj,'msg',{
        configurable:true,//可以被删除
        enumerable:true,//可以被枚举和访问
        writable:true,//可以被运算符赋值
        value:'这是msg的值'
    })

    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}

    //configurable:false
    delete obj.msg
    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}

    //configurable:true *可删除不受可枚举和可赋值的项影响
    delete obj.msg
   
    console.lof(obj) -> {data: Array(3)}


    //enumerable:false
    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}
    console.log(Object.keys(obj)) -> ["data"]
    for (key in obj) {
        console.log(key) -> data
    }


    //enumerable:true
    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}
    console.log(Object.keys(obj)) ->  ["data", "msg"]
    for (key in obj) {
        console.log(key) -> data msg
    }


    //writable:false && enumerable:false
    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}
    console.log(Object.keys(obj)) ->  ["data"]
    for (key in obj) {
        console.log(key) -> data
    }


    //writable:true && enumerable:false  
    console.lof(obj) -> {data: Array(3), msg: "这是定义msg的值"}
    console.log(Object.keys(obj)) ->  ["data"]
    for (key in obj) {
        console.log(key) -> data
    }


    //writable:true && enumerable:true *说明想要改变值，必须先可访问、可枚举
    obj.msg = "这是改变后的值"
    
    console.lof(obj) -> {data: Array(3), msg: "这是改变后的值"}
    console.log(Object.keys(obj)) ->  ["data", "msg"]
    for (key in obj) {
        console.log(key) -> data msg
    }

```

#### 用 hasOwnProperty 区别于 in & Object.keys()会过滤掉继承属性
> in 枚举时候不会区分是不是本身属性还是继承属性（如果属性通过Object.defineProperty() 添加的，且 enumerable 为 false 时，也是不能被 in 访问的）

``` javascript
    let obj = {
        data:[1,2,3]
    }

    Object.defineProperty(obj,'msg',{
        configurable:false,
        enumerable:false,
        writable:false,
        value:'这是msg的值'
    })

    let obj1 = Object.create(obj)
    console.log(obj1.propertyIsEnumerable('msg')) //判断可枚举属性是true/false

    for(key in obj1){
        console.log(key,'这是in的打印')
        if(obj1.hasOwnProperty(key)){
            console.log(key,'这是hasOwnProperty的打印')
        }
    }

    ->
        false //可枚举属性值 
        name 这是in的打印  
        data 这是in的打印
        data 这是hasOwnProperty的打印

    // Object.keys()
    console.log(Object.keys(obj1))  -> ["name"]


```

#### get || set 方法
``` javascript
    function fn() {}
    Object.defineProperty(fn.protoperty,'msg',{
        //想要用get就不能设置其余的四个属性
        get: function(){
            return 100
        }
    })
    
    let f1 = new fn()
    console.log(f1.msg) -> 100
    f1.msg = 111
    console.log(f1.msg) -> 100

    //可以在实例化上加上 enumerable、writable、value 属性后，改变
    Object.defineProperty(f1, 'msg', {
        enumerable: true,
        writable: true,
        value: 200
    })
    console.log(f1.msg) -> 200  //如果没有value，这里为undefind
    f1.msg = 111
    console.log(f1.msg) -> 111

```
``` javascript
        var Vue = function () {}

    let data = {
        name: '',
        age: ''
    }
    Object.keys(data).forEach(v => {
        Vue[v] = ''
        init(v)
    })

    function init(x) {
        let str = '_' + x
        Object.defineProperty(Vue.prototype, str, {
            get: function () {
                return this[x]
            },
            set: function (value) {
                this[x] = value
            }
        })
    }

    var vue = new Vue()
    vue.name = '笑话'
    console.log(vue)
    ->
    Vue {name: "笑话"}
        name: "笑话"
        _age: undefined
        _name: "笑话"
        __proto__: Object
    

```

