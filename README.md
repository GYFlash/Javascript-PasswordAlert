# Javascript-PasswordAlert
javascript 实现支付密码弹框
在HTML 文档里加入"\<div id="id" >\</ div> "
在需要弹框的页面PasswordAlert.init("id","支付标题",function(value){},function(){}); value 为返回的6位数密码，第二个function是点击设置支付密码的回调
在需要弹出输入框的地方 PasswordAlert.show();
