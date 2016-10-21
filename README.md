# HTML-5-CSS-3-JS

### 一、使用多栏布局

    -moz-column-count: integer;	//设置盒分栏数量
	-webkit-column-count: integer;

	-moz-column-width: 20em; //这是分栏宽度
	-webkit-column-width: 20em;

	-moz-column-grap: 2em; //设置分栏间隔
	-webkit-column-grap: 2em;

	-moz-colun-rule: solid 1px red;	//设置间隔线
	-webkit-column-rule: solid 1px red;
注: <strong>由于多栏布局时，各栏宽度一样，高度一样，具体显示的内容也不确定，所以多用来显示文本文档而不是用来整体布局。</strong>

### 二、使用盒布局

	display: -moz-box;	//外部容器使用，表面容器内采用盒布局
	display: -webkit-box

	//自适应窗口的弹性盒布局，使用之后盒总高度、总宽度等于外部容器的高度、宽度
	-moz-box-flex: integer:	
	-webkit-box-flex: integer;

	-moz-box-ordinal-group: integer;	//盒元素显示顺序呢
	-webkit-box-ordinal-group: integer;

	//计算盒高度、宽度的计算方式,border-box包含空白，content-box不包含空白
	-moz-box-sizing: border-box | content-box;
	-webkit-box-sizing: border-box | content-box;

	//元素排列方式:vertical垂直方式，horizontal水平方式显示
	-moz-box-orient: vertical | horizontal;
	-webkit-box-orient: vertical | horizontal;

	-moz-box-pack: start | center | end;  //水平方向内容显示位置:前、中、后
	-webkit-box-pack: start | center | end;

	-moz-box-align: start | center | end;  //垂直方向内容显示位置:上、中、下
	-webkit-box-align: start | center | end;
