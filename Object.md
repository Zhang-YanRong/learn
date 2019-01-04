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
    //指向window(所有在最外层没有怪到别的对象上的变量或属性都会默认挂在window)
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
    --------------------------------------------------------------------------------
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