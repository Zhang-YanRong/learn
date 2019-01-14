# Object

## 创建对象模式
* 工厂模式
* 构造函数模式
* 原型模式
* 组合使用构造函数模式和原型模式
* 动态原型模式
* 寄生构造函数模式
* 稳妥构造函数模式

## 继承
* 原型链
* 借用构造函数
* 原型式继承
* 寄生式继承
* 寄生组合式继承

### 1.1 工厂模式

#### 实现方式：
``` bash 
    function createObjectFn (name,age) {
        let a = new Object();
        a.name = name;
        a.age = age;
        a.message = function () {
            console.log(`我叫${this.name},  今年${this.age}岁。`)
        }
        return a;  //如果不return，严格模式下默认return undefind
    }
```

##### 缺点：
    返回的对象都只有这三个固定的属性，不灵活



### 1.2 构造函数模式
js中有原生的构造函数，如：Object、Array；此外亦可创建自定义构造函数:
``` bash 
    function CreateObjectFn (name, age) {
        this.name = name;
        this.age = age;
        this.message = function () {
            console.log(`我叫${this.name},  今年${this.age}岁。`)
        }
    }
```
#### 易错
>* 1.1与1.2这两种函数都是直接挂在window上的，CreateObjectFn.name = 'CreateObjectFn'
>* 正确调用方法：window.name = '函数中的name值'，其他属性同理，CreateObjectFn.message 会报错

#### 差异
    1.没有在表面上创建对象
    2.直接对this赋值属性和方法
    3.没有return
    4.方法名以大写开头

上面只是自定义构造函数，所以使用时候需要用new来实例化一个或多个对象：

#### new 四步
>* 1.创建一个新对象
>* 2.将构造函数的作用域赋给新对象（所以this就指向了这个对象）
>* 3.执行构造函数中的代码（给新对象添加属性）
>* 4.返回新对象

#### 特点
//当构造函数使用

``` bash 
    var X = new CreateObjectFn('小蛙', 1);
    X.message(); //我叫小蛙,  今年1岁。
    
    注:
    console.log(X) //CreateObjectFn {name: "小蛙", age: 1, message: ƒ ()}
```

//作为普通函数调用
``` bash 
    CreateObjectFn('小蛙', 1);
    //指向window(所有在最外层没有挂到别的对象上的变量或属性都会默认挂在window)
    window.message(); //我叫小蛙,  今年1岁。
```
//在另一个对象的作用域中调用
``` base 
    var a = new Object();
    CreateObjectFn.call(a, '小蛙', 1);
    a.message(); //我叫小蛙,  今年1岁。
```

#### 延伸 call()、apply()、bind()
``` bash 
    var M = new CreateObjectFn('小蛙', 1);
    var other = {
        name:'猫咪',
        age:12
    }
    M.message.call(other) //我叫猫咪,  今年12岁。 
    M.message.apply(other) //我叫猫咪,  今年12岁。
    M.message.bind(other)() //我叫猫咪,  今年12岁。
    注：message不加()
```
``` bash
    传参用法：
    var obj = {
        name:'小蛙',
        age:15,
        message: function (x,y) {
            console.log(this.name + x + this.age + y)
        }
    }

    var str = {
        name:'小明',
        age:3
    }

    obj.message('今年','岁') //小蛙今年15岁
    obj.message.call(str,'今年','岁') //小明今年3岁
    obj.message.apply(str,['今年','岁']) //小明今年3岁
    obj.message.call(str,'今年','岁')() //小明今年3岁
```

``` bash
    //附加bind的源码实现
    // the .bind method from prototype.js
    Function.prototype.bind = function(){
        var fn = this, args = Array.prototype.slice.call(arguments),object 
        = args.shift();
        return function(){
            return fn.apply(object,args.concat(Array.prototype.slice.call(arguments)));
        }
    }
```

#### 缺点
``` bash 
    1.在每次实例化的时候，里面的方法都会被Function创建一遍，会多次调用Function函数
    2.多次实例化过程中创建的方法不是同一个Function的实例，所以，也就会有不同的作用域链和标识符解析
```
``` bash 
    //解决上述的多次实例化Function
    function CreateObjectFn (name, age) {
        this.name = name;
        this.age = age;
        this.message = messageFn;
    }

    function messageFn () {
        console.log(`我叫${this.name},  今年${this.age}岁。`)
    }

    //这种方法虽然解决了只实例化一次Function,但是当一个对象内部有多个函数，也就要全局创建多个函数，就没封装性可言
```

### 1.3 原型链模式
> 1.每个【函数】对象都有一个prototype（原型）属性

> 2.prototype就是通过调用构造函数而创建的那个对象实例的原型对象

> 3.所有对象都共享原型对象包含的属性和方法(所有实例用的都是同一个属性或方法)

> 4.当访问实例的属性时，优先访问实例的，如果没有，再找他的原型上的

> 5.在给实例上添加属性后，可以用delete方法删除该属性

> 6.用hasOwnProperty检测是否是原型的属性,该方法是继承Object,只在给定属性存在于对象实例中时，才会返回true

``` bash
    function createObjectFn (name,age) {
        //这里必须是函数对象，理由：见1
    }
    createObjectFn.prototype.name = '小明';
    createObjectFn.prototype.age = 2;
    createObjectFn.prototype.message = function () {
        console.log(`我叫${this.name},  今年${this.age}岁。`)
    }

    var X = new createObjectFn();
    X.message(); //我叫小明,  今年2岁。
```
//注解4
``` bash 
    X.name = '小蛙';
    X.message(); //我叫小蛙,  今年2岁。
```
//注解5
``` bash
    X.name = '小蛙';
    delete X.name;
    X.message(); //我叫小明,  今年2岁。
```
//注解6
``` bash
    X.hasOwnProperty("name"); //true ->来自实例
    delete X.name; ,.x
    X.hasOwnProperty("name"); //false ->来自原型
```
#### 对象中 in 操作符
in有两种使用方式：
>* 单独使用： "属性" in obj   -> true/false 判断属性是否在对象中（不区分属性来自实例还是原型）
>* for - in 循环中

##### 用法
in 与 hasOwnProperty 结合使用判断属性是来自对象还是实例

``` bash
    function hasOwnPrototype (object, name){
        return !object.hasOwnProperty( name ) && ( name in object )
    }
```

#### 对象中 Object.keys() && Object.getOwnPropertyName() 枚举的用法
//非函数对象
``` bash 
    var a = {
        name: '小蛙',
        age:3
    }

    Object.keys(a) => ["name","age"]
    Object.getOwnPropertyNames(a)  //Object.getOwnPrototypeName is not a function
```
//函数对线
``` bash 
    function Person (){
        this.sex = "男" 
    }
    Person.prototype.name = "小蛙"
    Person.prototype.age = 23
    Person.prototype.message = function (){
        console.log(`我叫${this.name}，今年${this.age}岁`)
    }
    let people = new Person()
    Object.keys(Person) -> []
    Object.keys(people) -> ["sex"]  
    Object.getOwnPropertyNames(Person.prototype) -> ["constructor", "name", "age", "message"]
    Object.getOwnPropertyNames(people) -> ["sex","name"] 
```
> 说明Object.keys() 方法只能枚举所有不在原型prototype上的属性