"use strict";		//如果浏览器支持的话，开启ECMAScript 5严格模式

function calculate() {
	var amount = document.getElementById("amount");
	var apr = document.getElementById("apr");
	var years = document.getElementById("years");
	var zipcode = document.getElementById("zipcode");
	var payment = document.getElementById("payment");
	var total = document.getElementById("total");
	var totalinterest = document.getElementById("totalinterest");

	/*
	*principal => 总资本
	*interest => 月利息
	*payments => 贷款月数
	*/
	var principal = parseFloat(amount.value);
	var interest = parseFloat(apr.value) / 100 / 12;
	var payments = parseFloat(years.value) * 12;

	//计算月付款
	var x = Math.pow(1 + interest, payments);
	var monthly = (principal * x * interest) / (x - 1);

	//isFinite => 检测是否为数字
	if (isFinite(monthly)) {
		payment.innerHTML = monthly.toFixed(2);		//四舍五入到小数点后两位数字
		total.innerHTML = (monthly * payments).toFixed(2);
		totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

		//将数据存入localStorage对象中
		save(amount.value, apr.value, years.value, zipcode.value);

		try {
			//将用户输入的数据发送至服务器，这里未实现此功能
			//getLenders(amount.value, apr.value, years.value, zipcode.value);
		}
		catch(e) {
			//忽略异常代码
		}

		chart(principal, interest, monthly, payments);
	}
	else {
		payment.innerHTML = "";
		total.innerHTML = "";
		totalinterest.innerHTML = "";
		chart();
	}
};

function save(amount, apr, years, zipcode) {
	if (window.localStorage) {
		localStorage.loan_amount = amount;
		localStorage.loan_apr = apr;
		localStorage.loan_years = years;
		localStorage.loan_zipcode = zipcode;
	}
}

//文档首次加载的时候，恢复上次输入的数据
window.onload = function() {
	if (window.localStorage && localStorage.loan_amount) {
		document.getElementById("amount").value = localStorage.loan_amount;
		document.getElementById("apr").value = localStorage.loan_apr;
		document.getElementById("years").value = localStorage.loan_years;
		document.getElementById("zipcode").value = localStorage.loan_zipcode;
	}
}

function chart(principal, interest, monthly, payments) {
	var graph = document.getElementById("graph");
	graph.width = graph.width;	//巧妙的手法清除并重置画布

	//如果没有参数或者不支持画布则直接返回
	if (arguments.length == 0 || !graph.getContext) {
		return;
	}

	var g = graph.getContext("2d");
	var width = graph.width;
	var height = graph.height;

	//讲付款数字和美元数据转换成像素
	function paymentToX(n) {
		return n * width / payments;
	}

	function amountToY(n) {
		return height - (n * height / (monthly * payments * 1.05));	//乘以1.05为了显示效果优良
	}

	g.moveTo(paymentToX(0), amountToY(0));
	g.lineTo(paymentToX(payments), amountToY(monthly * payments));
	amountToY(monthly * payments);
	g.lineTo(paymentToX(payments), amountToY(0));
	g.closePath();
	g.fillStyle = "#f88";
	g.fill();
	g.font = "bold 12px sans-serif";
	g.fillText("Total Interest Payments", 20, 20);

	var equity = 0;
	g.beginPath();
	g.moveTo(paymentToX(0), amountToY(0));

	for (var p = 1; p <= payments; p++) {
		//计算没一个月付款中本金的数目
		var thisMonthsInterest = (principal - equity) * interest;
		equity += (monthly - thisMonthsInterest);
		g.lineTo(paymentToX(p), amountToY(equity));
	}

	g.lineTo(paymentToX(payments), amountToY(0));
	g.closePath();
	g.fillStyle = "green";
	g.fill();
	g.fillText("Total Equity", 20, 35);

	var bal = principal;
	g.beginPath();
	g.moveTo(paymentToX(0), amountToY(bal));

	for (p = 1; p <= payments; p++) {
		var thisMonthsInterest = bal * interest;
		bal -= (monthly - thisMonthsInterest);
		g.lineTo(paymentToX(p), amountToY(bal));
	}

	g.lineWidth = 3;
	g.stroke();
	g.fillStyle = "black";
	g.fillText("Loan Balance", 20, 50);

	g.textAlign = "center";
	var y = amountToY(0);

	for (var year = 1; year * 12 <= payments; year++) {
		var x = paymentToX(year * 12);
		g.fillRect(x - 0.5, y - 3, 1, 3);

		if (year == 1) {
			g.fillText("Year", x, y - 5);
		}

		if (year % 5 == 0 && year * 12 != payments) {
			g.fillText(String(year), x, y - 5);
		}
	}

	g.textAlign = "right";
	g.textBaseline = "middle";
	var ticks = [monthly * payments, principal];
	var rightEdge = paymentToX(payments);

	for (var i = 0; i < ticks.length; i++) {
		var y = amountToY(ticks[i]);
		g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
		g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
	}
}