### 第四章 变量、作用域和内存问题

1. 基本数据类型：Undefined、Null、Boolean、Number、String
2. 基本数据类型在内存中占据固定大小的空间，因此被保存在栈内存中
3. 从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本
    
        var num1 = 5;
        var num2 = num1;

        num1 = 23;
        alert("num1 = " + num1 + ", num2 = " + num2); //num1 = 23, num2 = 5

4. 引用类型的值是对象，保存在堆内存中
5. 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针

        var obj1 = new Object();
        var obj2 = obj1;

        obj1.name = "Jason";
        alert(obj2.name);   //"Jason"

6. 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象

        function addTen(num) {
          num += 10;
          return num;
        }

        var count = 20;
        var result = addTen(count);

        alert("count = " + count + ", result = " + result);   //count = 20, result = 30

        function setName(obj) {
          obj.name = "Jason";
        }

        var person = new Object();
        setName(person);

        alert(person.name);   //"Joason"

        function setName(obj) {
          obj.name = "Joason";
          obj = new Object();
          obj.name = "Ming Er";
        }

        var person = new Object();
        setName(person);
        alert(person.name);   //"Joason"
        
7. 确定一个值是哪种基本类型可以使用typeof操作符，而确定一个值是哪种引用类型可以使用instanceof操作符
8. 执行环境有全局环境和函数执行环境之分
9. 每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链
10. 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全局环境
11. 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据
12. 变量的执行环境有助于确定应该何时释放内存
    1. JS是一门具有自动垃圾收集机制的编程语言
    2. 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除
    3. “标记清楚”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存
    4. 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。js目前不是用这种算法

            function problem() {
              var objectA = new Object();
              var objectB = new Object();

              objectA.someOtherObject = objectB;
              objectB.anotherObject = objectA;
            }
        
    5. 当代码中存在循环引用现象时，“引用计数”算法就会当值问题
    6. 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用
13. js没有块级作用域

        if (true) {
          color = "blue";
        }

        alert(color);   //"blue"

    在js中，if语句中的变量声明会将变量添加到当前的执行环境中，但是在使用for语句时尤其要牢记这一差异

        for (var i = 0; i < 10; ++i) {
          doSomething(i);
        }

        alert(i);   //10

14. 使用var声明的变量会自动被添加到最接近的环境中

        function add(num1, num2) {
          var sum = num1 + num2;
          return sum;
        }

        var result = add(10, 20);   //30
        alert(sum);   //由于sum不是有效的变量，因此会导致错误

        function addTest(num1, num2) {
          var sum = num1 + num2;
          return sum;
        }

        var result = addTest(10, 20);   //30
        alert(sum);   //30，当不用var声明的时候变量会添加到全局环境中去，所以一定避免不使用var的情况

### 第五章 引用类型

1. Object类型

        function displayInfo(args) {
          var output =  "";
          
          if (typeof args.name == "string") {
            output += "Name: " + args.name + "\n";
           }
          
          if (typeof args.age == "number") {
            output += "Age: " + args.age + "\n";
          }
          
          alert(output);
        }

        displayInfo({
          name : "Joason",
          age : 20
        });   //Name:Joason \n Age:20

        displayInfo({
          name : "MingEr"
        });   //Name:MingEr

2. Array类型（数据是有序序列，每一项可以保存任何类型的数据）

        var colors = ["red", "blue", "green"];
        alert(colors[2]);   //"green"

        var colors = new Array("red", "blue", "green");
        alert(colors.length);   //3

3. Object类型和Array类型一样，在使用数组字面量表示法时，都不会调用对应的构造函数
4. 所有对象都具有toLocaleString()、toString()、valueOf()方法。

        var colors = new Array("red", "blue", "green");

        alert(Array.isArray(colors));    //true
        alert(colors.toLocaleString());   //”red,blue,green“
        alert(colors.toString());   //"red,blue,green"
        alert(colors.valueOf());    //"red,blue,green" //实质上是["red", "blue", "green"]即返回的是数组，通过多次调用toString()方法合成的
        alert(colors);

    1. 对象调用toLocaleString()方法时不总是与toString()和valueOf()方法结果一样，当对数组调用toLocaleString()方法时对每一项调用toLocaleString()方法

            var person1 = {
              toLocaleString : function() {
                return "Joason";
              },
              
              toString : function() {
                return "JTrancender";
              }
            };

            var person2 = {
              toLocaleString : function() {
                return "MingEr";
              },
              
              toString : function() {
                return "Ming";
              }
            };

            var person = new Array(person1, person2);
            alert(person);    //JTrancender,Ming
            alert(person.toString());    //JTrancender,Ming
            alert(person.valueOf());    //JTrancender,Ming
            alert(person.toLocaleString());   //Joason,MingEr

    2. 默认的toString()方法分隔符是逗号，当用join时可使用任何字符分割（不给任何值或者undefined就会以逗号作为分隔符）

            var colors = new Array("red", "blue", "green");
            alert(colors.join(","));    //"red,blue,green"
            alert(colors.join("|"));    //"red|blue|green"

    3. 栈方法

            var colors = new Array();
            var count = colors.push("red", "green");
            alert(count);   //2

            count = colors.push("black");
            alert(count);   //3

            var item = colors.pop();
            alert(item);    //"black"
            alert(colors.length);   //2

    4. 如果数组中的某一项的值是null或者undefined，那么该值在join()、toLocaleString()、toString()和valueOf()方法返回的结果中以空字符表示

            var colors = ["red", "green"];
            colors.push(null);
            colors.push(undefined);

            alert(colors);    //red,green,,

    5. 队列方法（通过push尾部添加数据和shift获取第一项，也可以通过unshift在前段添加数据并使用pop获取最后一项实现队列方法）

            var colors = new Array();
            var count = colors.push("red", "green");
            alert(count);   //2

            count = colors.push("black");
            alert(count);   //3

            var item = colors.shift();
            alert(item);    //"red"
            alert(colors.length);   //2

            var colors = new Array();
            var count = colors.unshift("red", "green");
            alert(count);   //2

            count = colors.unshift("black");
            alert(count);   //3

            var item = colors.pop();
            alert(item);    //"green"
            alert(colors.length);   //2


    6. 重排序方法（数组中存在reverse()和sort()方法对数组进行排序，reverse是反转数组项的顺序，sort是对每一项调用toString方法然后比较字符串结果）

            var values = [0, 1, 5, 10, 15];
            values.reverse();
            alert(values);    //15,10,5,1,0

            var values = [0, 1, 5, 10, 15];
            values.sort();
            alert(values);    //0,1,10,15,5

        > <small>默认的sort方法通常不是最佳方案，因此可以自定义排序准则</small>

            function compare(value1, value2) {
              if (value1 < value2) {
                return -1;
              } else if (value1 > value2) {
                return 1;
              } else {
                return 0;
              }
            }

            var values = [0, 1, 15, 10, 5];
            values.sort(compare);
            alert(values);    //0,1,5,10,15

        >  <strong>reverse()和sort()方法的返回值是经过排序之后的数组</strong>
        >  对于数值类型或者其valueOf方法会返回数值类型的对象类型，可以使用一个更简单的比较函数

            function compare(value1, value2) {
              return value2 - value1;
            }

    7. concat操作方法 

        > 该方法可以基于当前数组中的所有项创建一个新数组，这个方法先创建当前数组的一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组
        > 如果传递给concat方法的是一个或者多个数组，则该方法会将这些数组中的每一项添加到结果数组中去
        > 如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾
        
            var colors = ["red", "green", "blue"];
            var colors2 = colors.concat("yellow", ["black", "brown"]);

            alert(colors);    //red,green,blue
            alert(colors2);   //red,green,blue,yellow,black,brown

    8. slice操作方法

        > 基于当前数组创建一个新数组，可以接受一个或者两个参数用来表明起始和结束位置
        
            var colors = ["red", "green", "blue", "yellow", "purple"];
            var colors2 = colors.slice(1);
            var colors3 = colors.slice(1, 4);

            alert(colors2);   //{"green","blue","yellow","purple"}
            alert(colors3);   //{"green","blue","yellow"}

    9. splice操作方法

        > 1. 删除：splice(0, 2)会删除数组中的前两项
        > 2. 插入：splice(起始位置，0(要删除的项数)，...(要插入的项))
        > 3. 替换：splice(起始位置，要删除的项数，要插入的任意数量的项)
        > 4. splice方法始终都会返回一个数组，返回的是删除项数组成的数组
          
            var colors = ["red", "green", "blue"];
            var removed = colors.splice(0, 1);
            alert(colors);    //{"green","blue"}
            alert(removed);   //{"red"}

            removed = colors.splice(1, 0, "yellow", "orange");
            alert(colors);    //{"green","yellow","orange","blue"}
            alert(removed);   //""

            removed = colors.splice(1, 1, "red", "purple");
            alert(colors);    //{"green","red","purple","orange","blue"}
            alert(removed);   //{"yellow"}
    10. indexOf和lastIndexOf操作方法

        > 两个方法都接受两个参数（要查找的项和表示查找起点位置的索引<可选项>)
        
            var numbers = {1, 2, 3, 4, 5, 4, 3, 2, 1};
            alert(numbers.indexOf(4));    //3
            alert(numbers.lastIndexOf(4));    //5

            alert(numbers.indexOf(4, 4));   //5
            alert(numbers.lastIndexOf(4, 4));   //3
            alert(numbers.indexOf(0));      //-1
            alert(numbers.lastIndexOf(0));    //-1

    11. 迭代方法

        > every(): 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true
            
            var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
            var everyResult = numbers.every(function(item, index, array){
              return item > 2;
            });

            alert(everyResult);   //false

        > some(): 对数组中的每一项运行函数，如果有一个返回true，则返回true
            
            var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
            var someyResult = numbers.some(function(item, index, array){
              return item > 2;
            });

            alert(someResult);    //true

        > filter(): 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
        
            var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
            var filterResult = numbers.filter(function(item, index, array){
              return item > 2;
            });

            alert(filterResult);    //[3, 4, 5, 4, 3]

        > map(): 也返回一个数组，数组的每一项都是在原始数组中的对应项上运行函数的结果
        
            var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
            var mapResult = numbers.map(function(item, index, array){
              return item * 2;
            });

            alert(mapResult);   //2, 4, 6, 8, 10, 8, 6, 2

        > forEach(): 对数组中的每一项运行给定函数，这个方法没有返回值
        
            var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
            var forEachResult = numbers.forEach(function(item, index, array){
              array[index] += 1;
            });

            alert(numbers);   //[2, 3, 4, 5, 6, 5, 4, 3, 2]

    12. 缩小方法

        > `reduce()`和`reduceRight()`方法都会迭代所有项，然后构建一个最终返回值
        > `reduce()`方法从数组的第一项开始，逐个遍历到最后
        > `reduceRight()`方法从数组的最后一项开始，向前遍历到第一项
        > 两个方法都接受两个参数：一个在每一项上调用的函数和<可选的>作为缩小基础的初始值
        > 给定函数接受四个参数：前一个值、当前值、项的索引、数组对象
        
            var values = [1, 2, 3, 4, 5];
            var sum = values.reduce(function(prev, cur, index, array){
              return prev + cur;
            });

            alert(sum);    //15

            var sum = values.reduceRight(function(prev, cur, index, array){
              return prev + cur;
            });

            alert(sum);   //15

5. Date类型
    1. 日期格式化方法

        > `toDateString()`以特定于实现的格式显示星期几、月、日和年
        > `toTimeString()`以特定于实现的格式显示时、分、秒和地区
        > `toLocaleDateString`以特定于地区的格式显示星期几、月、日和年
        > `toLocaleTimeString`以特定于实现的格式显示时、分、秒
        > `toUTCString`以特定于实现的格式完整的UTC日期
        > 与`toLocaleString`和`toString`方法一样，以上这些字符串格式 方法的输出也是因浏览器而异的
    


  
