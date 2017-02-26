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

15. 
    <table>
      <tr>
        <td>Poo</td>
      </tr>
    </table>