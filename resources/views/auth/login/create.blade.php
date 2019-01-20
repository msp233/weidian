

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <!--↑↑模板中请务必使用HTML5的标准head结构↑↑-->
    <meta name="author" content="shopex UED Team" />
    <link rel="icon" href="https://wd.hnmall.com/app/topwap/statics/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="https://wd.hnmall.com/app/topwap/statics/favicon.ico" type="image/x-icon" />


    <title>测试环境，请勿进行真实业务行为_友阿微店</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link type='image/x-icon' href='/images/a2/12/48/d180da5fd7665600b83ad0ec74a64272f42377e0.png' rel='apple-touch-icon-precomposed'>


    <link href="css/shopex.picker.css" rel="stylesheet" media="screen, projection" />
    <link href="css/shopex.picker.min.css" rel="stylesheet" media="screen, projection" />
    <link href="css/shopex.poppicker.css" rel="stylesheet" media="screen, projection" />
    <link href="css/style.css" rel="stylesheet" media="screen, projection" />
    <link href="css/widgets.css" rel="stylesheet" media="screen, projection" />
    <script src="js/zepto.js"></script>
    <script src="js/shopex.js"></script>
    <script src="js/shopex.picker.js"></script>
    <script src="js/shopex.poppicker.js"></script>
    <script src="js/shopex.zoom.js"></script>
    <script src="js/shopex.previewimage.js"></script>
    <script src="js/common.js"></script>
    <script src="js/validate.js"></script>
</head>

<body>
<header class="page-header">
    <i class="header-left icon-func bbc-icon bbc-icon-back shopex-action-back"></i>
    <div class="header-title">会员登录</div>
</header>
<section class="container">
    <form class="form-container" action="https://wd.hnmall.com/wap/passport-dologin.html" method="post" id="login_form">
        <input type="hidden" name="next_page" value="https://wd.hnmall.com/wap">
        <input type="hidden" name="key" value="topwap_signin">
        <section class="shopex-input-group">
            <div class="shopex-input-row">
                <label>帐号：</label>
                <input type="text" name="email" value="" class="shopex-input-clear" placeholder="请输入您的email/手机" required data-caution="请输入您的账号">
            </div>
            <div class="shopex-input-row">
                <label>密码：</label>
                <input type="password" name="password" class="shopex-input-password" placeholder="请输入密码" required data-caution="请输入密码">
            </div>
        </section>
        <section class="content-horizontal-padded content-right">
            <a class="fontS font-orange" href="https://wd.hnmall.com/wap/passport-gofindpwd.html">忘记密码</a>
        </section>
        <section class="content-horizontal-padded form-op-section">
            <button type="submit" class="shopex-btn shopex-btn-block shopex-btn-warning bbc-btn-warning" id="action_signin_submit">登录</button>
        </section>
    </form>
    <section class="content-horizontal-padded">
        <a class="shopex-btn shopex-btn-block" href="https://wd.hnmall.com/wap/passport-goregister.html">快速注册</a>
    </section>
    <section class="font-gray-20 sns-login">
        <div class="section-title">使用其他账号</div>
        <div class="section-container">
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbb96d20de9ed62a&redirect_uri=https%3A%2F%2Fwd.hnmall.com%2Fwap%2Ftrustlogin-bind.html%3Fflag%3Dwapweixin&response_type=code&scope=snsapi_userinfo&state=a1d058502a2dfb757319b2595cebe6b7#wechat_redirect"
               class="section-init content-center">
                <i class="bbc-icon bbc-icon-wapweixin-member"></i><br>微信免登 </a>
        </div>
    </section>
</section>

<script>
    $('#action_signin_submit').data('ajaxCallback', function(rs) {
        var isShowVcode = "";
        if (rs.error && isShowVcode) {
            changeCode($('.auto-change-verify-handle'));
        }
        if (rs.redirect) {
            location.href = rs.redirect;
        }
    });

    $('#login_form').find('button[type=submit]').data('ajaxConfig', {
        callback: function(rs) {
            if (rs.error) {
                shopex.alert(rs.message);
            }
        }
    });
</script>
</body>

</html>
