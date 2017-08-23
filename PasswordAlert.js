/**
 * Created by GYFlasher on 2017/8/9.
 * 弹出密码输入框
 * 在HTML 文档里加入<div id="id"></div>
 * 在需要弹框的页面PasswordAlert.init("id","支付标题",function(value){},function(){}); value 为返回的6位数密码，第二个function是点击设置支付密码的回调
 * 在需要弹出输入框的地方 PasswordAlert.show();
 */
var PasswordAlert = {
    alert:null,
    input:null,
    array:null,
    init:function (id,title,callback,setPwd) {
        var passwordAlert = document.getElementById(id);
        this.alert = passwordAlert;
        passwordAlert.innerHTML = '<div style="position: absolute;width: 30px;height: 30px;line-height: 30px;text-align: center;font-size: 20px;right: -5px;top: -5px;color: gray" onclick="PasswordAlert.dismiss()">×</div>' +
        '<p style="width: 100%;height: 20px;text-align: center;font-size: 14px;margin-top: 10px;margin-bottom: 10px">' +
        '请输入支付密码' +
        '<hr>' +
        '<p id="password-title" style="width: 100%;text-align: center;font-size: 12px;color: gray;margin-top: 5px"></p>' +
        '</p>' +
        '<div id="password-content">' +
        '<input id="password" type="text" maxlength="6" oninput="passwordChange(this)" >' +
        '<span class="line line0">.</span>' +
        '<span class="line line1">.</span>' +
        '<span class="line line2">.</span>' +
        '<span class="line line3">.</span>' +
        '<span class="line line4">.</span>' +
        '<span class="line line5">.</span>' +
        '</div>' +
        '<a id="setPayPWD" style="display:inline-block;width:100%;height:30px;text-align:center;color:blue;font-size:12px;line-height:30px;">设置支付密码</a>';
        var screenW = document.body.clientWidth;
        this.setStyles(passwordAlert,{
            width:"250px",
            height:"150px",
            backgroundColor:"rgba(255,255,255,0.9)",
            position:"fixed",
            zIndex:10000,
            left:(screenW - 250) / 2 + "px",
            top:"100px",
            boxShadow:"0 0 5px 0 rgba(0,0,0,0.3)",
            borderRadius:"10px",
            transform:"scale(0,0)"
        });
        var titleLabel = document.getElementById("password-title");
        titleLabel.innerHTML = title;
        var passwordContent = document.getElementById("password-content");
        this.setStyles(passwordContent,{
            width:"182px",
            height:"32px",
            marginTop:"10px",
            marginLeft:"35px",
            position:"relative",
        });

        var passwordInput = document.getElementById("password");
        this.input = passwordInput;
        this.setStyles(passwordInput,{
            width:"180px",
            height:"30px",
            letterSpacing: "30px",
            outlineColor: "rgba(0,0,0,0)",
            borderRadius: "5px",
            border: "1px solid gainsboro",
            backgroundColor: "rgba(0,0,0,0)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10000,
            color: "rgba(0,0,0,0)"
        });

        var array = passwordContent.getElementsByClassName("line");
        this.array = array;
        for (var i = 0;i <array.length;i++ ) {
            var doc = array[i];
            this.setStyles(doc,{
                display: "inline-block",
                position: "absolute",
                height: "30px",
                width: "30px",
                top: "2px",
                left: i * 30 + "px",
                borderRight:"1px solid gainsboro",
                textAlign: "center",
                fontSize: "40px",
                lineHeight: "0",
                color: "rgba(0,0,0,0)",
            });
        }
        passwordInput.onfocus = function () {
            PasswordAlert.setStyles(this,{
                boxShadow: "0 0 5px 0 rgba(0,139,255,0.5)",
                border: "1px solid rgba(0,139,255,0.5)"
            });
            for (var i = 0;i <array.length;i++ ) {
                var doc = array[i];
                PasswordAlert.setStyles(doc, {
                    borderRight: "1px solid rgba(0,139,255,0.5)"

                });
            }
        };
        passwordInput.onblur = function () {
            PasswordAlert.setStyles(this,{
                boxShadow: "none",
                border: "1px solid gainsboro"
            });
            for (var i = 0;i <array.length;i++ ) {
                var doc = array[i];
                PasswordAlert.setStyles(doc, {
                    borderRight: "1px solid gainsboro"
                });
            }
        };
        passwordInput.oninput = function () {
            var value = this.value;
            for (var i = 0;i <array.length;i++ ) {
                var doc = array[i];
                doc.style.color = "rgba(0,0,0,0)";
            }
            for (var i = 0;i <value.length;i++ ) {
                var doc = array[i];
                doc.style.color = "#000000";
            }
            if (value.length == 6) {
            	PasswordAlert.dismiss();
                callback(value);
                
            }
        }
        var setPwdBtn = document.getElementById("setPayPWD");
        setPwdBtn.onclick = function(){
        	setPwd();
        }
    },
    setStyles:function (obj,styles) {
        for(var style in styles) {
            obj.style[style] = styles[style];
        }
    },
    show:function () {
    
        this.input.focus();
        this.setStyles(this.alert,{
            transform:"scale(1,1)",
            transition:"all 0.3s"
        });
    },
    dismiss:function () {
        this.input.blur();
        this.input.value = "";
        for (var i = 0;i <this.array.length;i++ ) {
            var doc = this.array[i];
            doc.style.color = "rgba(0,0,0,0)";
        }
        this.setStyles(this.alert,{
            transform:"scale(0,0)",
            transition:"all 0.3s"
        });
        
    }
};
