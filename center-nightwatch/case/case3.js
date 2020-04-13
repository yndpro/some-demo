
module.exports = {
    'loginByUnverify4399AccountInMy.4399.com': function (client) {
        const loginBtn = '.my_unlogin a[title="登录"]';
        const usernameInput = '#username';
        const passwordInput = '#j-password';
        const submitBtn = '.ptlogin_btn';
        client.url('http://my.4399.com').maximizeWindow()
            .pause(2000)
            .waitForElementVisible(loginBtn, 1000)
            .click(loginBtn)
            .frame('popup_login_frame')
                .pause(5000)
                .waitForElementVisible(usernameInput, 1000)
                .setValue(usernameInput, 'czj4399008')
                .pause(2000)
                .waitForElementVisible(passwordInput, 1000)
                .setValue(passwordInput, '123456')
                .pause(2000)
                .waitForElementVisible(submitBtn, 1000)
                .click(submitBtn)
                .frameParent()
            .frame('ifr')   
                .pause(5000) 
                .waitForElementVisible('#loginCertify', 1000)
                .saveScreenshot('reports/1.png')
    }
}