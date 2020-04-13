<template>
    <div id="app" class="index" style="width: 100%;height: 100%;text-align: center;">
        <div class="center">
            <div style="height: 110px;">
                <!--        <img src="../../static/img/logo-title.png" style="width: 128px;height: 35px;margin-bottom: 8px;" mode="aspectFit"/>-->
                <h1 class="ks-font-color" style="font-size: 30px;">门店拓客</h1>
            </div>

            <Card>
                <div style="text-align:center">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <FormItem prop="user">
                            <i-input type="text" size="large" v-model="formInline.user" placeholder="Username"
                                     @on-focus="inputFocus">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </i-input>
                            <p v-if="showPromptUser" class="font-prompt">{{loginPrompt}}</p>
                        </FormItem>
                        <FormItem prop="password">
                            <i-input type="password" size="large" v-model="formInline.password" placeholder="Password"
                                     @on-focus="inputFocus">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </i-input>
                            <p v-if="showPrompt" class="font-prompt">{{loginPrompt}}</p>
                        </FormItem>
                        <FormItem style="text-align: left;margin-bottom: 10px">
                            <Checkbox v-model="remember">记住密码</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button :loading="loading" size="large" type="primary" :long="true" @click="handleSubmit">{{loginText}}</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>

        </div>
        <div class="flex-row-center reserve-style">
            <p>©上海奇硕网络科技有限公司 │ 沪ICP备05013116号-2</p>
        </div>
    </div>
</template>

<script>
    import LoginService from '../services/login/LoginService'

    export default {
        name: 'Login',
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},

                    ]
                },
                loginPrompt: '',
                showPrompt: false,
                showPromptUser: false,
                //登录中
                loading: false,
                loginText:'登录',
                //记住密码
                remember: false,
            }
        },
        mounted: function() {
            this.getCookie();
        },
        methods: {
            // 聚焦事件
            inputFocus: function () {
                this.showPrompt = false;
                this.showPromptUser = false;
            },
            handleSubmit() {
                //记住密码
                this.rememberMe();
                const that = this;
                that.setLoading();
                let login = this.formInline.user.trim();
                let password = this.formInline.password.trim();
                if(!login || !password) {
                    that.setNoLoading();
                    this.formInline.user = '';
                    this.formInline.password = '';
                    return;
                }
                let request = {
                    login:login,
                    password:password
                };
                LoginService.login(request, function (data) {
                    let code = data.data.code;
                    that.setNoLoading();
                    if(code === '0000'){
                        sessionStorage.setItem("loginInfo", JSON.stringify(data.data.results));
                        sessionStorage.setItem("userId", data.data.results.userId);
                        sessionStorage.setItem("roleCode", data.data.results.roleCode);
                        that.$router.push('/home');
                        that.$Message.info("登陆成功");
                    }else if(code === '0004'){
                        that.$Message.info("账号不存在");
                    }else if(code === '0003'){
                        that.$Message.info("密码错误");
                    }else if(code === '1007'){
                        that.$Message.info("没有权限");
                    }else {
                        that.$Message.info("系统繁忙");
                    }
                });
            },
            //登录加载样式
            setLoading() {
                this.loading = true;
                this.loginText = '登录中...';
            },
            //取消登录加载样式
            setNoLoading() {
                this.loading = false;
                this.loginText = '登录';
            },
            //记住密码
            rememberMe() {
                //记住密码
                if (this.remember) {
                    // 保存期限为30天
                    this.setCookie(this.formInline.user, this.formInline.password, 30);
                } else {
                    // 清空 Cookie
                    this.clearCookie();
                }
            },
            // 设置Cookie-用户名, 密码, 保存天数
            setCookie(phone, password, exdays) {
                let exdate = new Date(); // 获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
                // 字符串拼接cookie
                window.document.cookie = 'login=' + phone + ';path=/;expires=' + exdate.toGMTString();
                window.document.cookie = 'password=' + password + ';path=/;expires=' + exdate.toGMTString();
            },
            // 清除Cookie
            clearCookie() {
                // 修改2值都为空，天数为负1天就好了
                this.setCookie('', '', -1);
            },
            // 读取Cookie
            getCookie() {
                if (document.cookie.length > 0) {
                    // 这里显示的格式需要切割一下自己可输出看下
                    let arr = document.cookie.split('; ');
                    for (let i = 0; i < arr.length; i++) {
                        // 再次切割
                        let arr2 = arr[i].split('=');
                        // 判断查找相对应的值
                        if (arr2[0] === 'login') {
                            this.remember = true;
                            // 保存到保存数据的地方
                            this.formInline.user = arr2[1];
                        } else if (arr2[0] === 'password') {
                            this.remember = true;
                            this.formInline.password = arr2[1];
                        }
                    }
                }
            },
        }
    }

</script>

<style scoped>
    .center {
        position: fixed;
        width: 350px;
        height: 300px;
        top: 42%;
        right: 10%;
        transform: translate(-150px, -130px);
    }

    .ivu-card-body {
        padding: 22px;
    }

    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        background-image: url(http://img.kiisoo.com/gds_login_bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        overflow: hidden;
    }

    .font-prompt {
        color: #FF6633;
        text-align: left;
    }

    .reserve-style {
        background: #edf5fd;
        height: 44px;
        font-size: 11px;
        color: #596274;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
