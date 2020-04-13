<style scoped>
  /deep/.title-font {
    color: #4E5966;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  /deep/.name-font {
    font-size: 14px;
    color: #4E5966;
  }

</style>
<template>
  <row style="margin-left: 30px;margin-top: 30px">
    <!--表单-->
    <div style="text-align: left">
      <span class="title-font">用户信息</span>
    </div>
    <div style="text-align: left;margin-top: 20px">
      <Form style="text-align: left" :model="addFrom"  :rules="addValidate" ref="addFrom">
        <Form-Item prop="userName">
          <span class="name-font" style="width: 80px;display: inline-block">用户名</span>
          <i-input  placeholder="请输入用户名"  style="width: 300px;" v-model="addFrom.userName"/>
        </Form-Item>
        <Form-Item prop="account">
          <span  class="name-font" style="width: 80px;display: inline-block">账号</span>
          <i-input placeholder="请输入账号"  style="width: 300px;" v-model="addFrom.account" />
        </Form-Item>
        <Form-Item prop="password">
          <span class="name-font" style="width: 80px;display: inline-block">密码</span>
          <i-input type="password" placeholder="请输入密码"  style="width: 300px;"  v-model="addFrom.password"/>
        </Form-Item>
        <Form-Item prop="confirmPassword">
          <span class="name-font" style="width: 80px;display: inline-block">确认密码</span>
          <i-input type="password" placeholder="请确认密码"  style="width: 300px;"  v-model="addFrom.confirmPassword"/>
        </Form-Item>
      </Form>
    </div>

    <!--角色-->
    <div style="text-align: left;margin-top: 30px">
      <span class="title-font">角色信息</span>
    </div>
    <div style="text-align: left;margin: 30px 0 0 30px">
      <RadioGroup v-for="item in roleList" :key="item.id" v-model="addFrom.roleId" style="margin-left: 15px" @on-change="roleChange(item)">
        <Radio :label="item.id">{{item.name}}</Radio>
      </RadioGroup>
    </div>

    <div style="margin-top: 40px" v-if="shopSelectDisplay">
      <span class="name-font" style="width: 80px;display: inline-block">店铺</span>
      <Select class="select-head" style="width: 300px;" clearable v-model="addFrom.shopId"  placeholder="请选择店铺" filterable>
        <Option v-for="item in shopList" :value="item.id" :key="item.id">{{item.name}}</Option>
      </Select>
    </div>

    <!--确认返回-->
    <row style="margin-top: 40px">
      <Button type="primary" style="height:39px;width:101px" @click="addAccountConfirm()">完成</Button>
      <Button  style="height:39px;width:101px;border:0" @click="addAccountCancel()">返回</Button>
    </row>

  </row>



</template>

<script>
    import accountManagementAdd from '../../services/account/AccountManagementAdd'
    import permission from '../../services/permission/Permission'
    export default {
      data() {
        return {
          name: "accountManagementAdd",
          addFrom: {
            userName: null,
            roleId: null,
            account: null,
            password: null,
            confirmPassword: null,
            shopId: null
          },
          addValidate: {
            userName:[
              {required:true,message:'用户名不能为空',trigger:'blur'},
              { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' },
              { pattern: /^[\u4e00-\u9fa5_0-9a-zA-Z]+$/, message: '只可以输入数字,字母,中文',trigger: 'blur'}
            ],
            account:[
              {required:true,message:'账号不能为空',trigger:'blur'},
              { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' },
              { pattern: /^[0-9a-zA-Z]*$/g, message: '只可以输入数字和字母',trigger: 'blur'},
            ],
            password:[
              {required:true,message:'密码不能为空',trigger:'blur'},
              { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
              { pattern: /^[0-9a-zA-Z]*$/g, message: '只可以输入数字和字母',trigger: 'blur'},
            ],
            confirmPassword:[
              {required:true,message:'确认密码不能为空',trigger:'blur'},
              { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
              { pattern: /^[0-9a-zA-Z]*$/g, message: '只可以输入数字和字母',trigger: 'blur'},
            ],
          },
          roleList: [
            {
              id:1,
              name:"系统管理员"
            },
            {
              id:2,
              name:"运营人员"
            },
            {
              id:3,
              name:"店长"
            },
          ],
          //店铺下拉框
          shopList: [
            {
              id:3,
              name:"店长"
            },
          ],
          //控制店铺筛选框
          shopSelectDisplay: false,
        }
      },
      mounted: function () {
        //查询所有角色-下拉框
        // this.listRole();

      },
      methods: {
        //查询所有角色
        // listRole() {
        //   let that = this;
        //   that.roleList = [];
        //   permission.listRoleInfoApi({}, function (data) {
        //     data = data.data;
        //     if(data.code === '0001') {
        //       that.$Message.error("查询失败");
        //       return;
        //     }
        //     if(data.code === '0000') {
        //       let row = data.results;
        //       for(let i = 0 ; i < row.length ; i++) {
        //         that.roleList.push(row[i]);
        //       }
        //     }
        //   });
        // },
        // //添加账号确定
        // addAccountConfirm : function () {
        //   if(this.addFrom.userName){
        //     this.addFrom.userName = this.addFrom.userName.trim();
        //   }
        //   if(this.addFrom.password){
        //     this.addFrom.password = this.addFrom.password.trim();
        //   }
        //   if(this.addFrom.confirmPassword){
        //     this.addFrom.confirmPassword = this.addFrom.confirmPassword.trim();
        //   }
        //   if(this.addFrom.account){
        //     this.addFrom.account = this.addFrom.account.trim();
        //   }
        //
        //   this.$refs["addFrom"].validate((valid) => {
        //     if (!valid) {
        //       return;
        //     }
        //
        //     if(this.shopSelectDisplay && !this.addFrom.shopId) {
        //       this.$Message.info("店长必须选择店铺");
        //       return;
        //     }
        //     if(!this.addFrom.roleId) {
        //       this.$Message.info("必须选择角色");
        //       return;
        //     }
        //     if(this.addFrom.confirmPassword !== this.addFrom.password) {
        //       this.$Message.info("两次输入密码必须一致");
        //       return;
        //     }
        //     let that = this;
        //     //验证
        //     let request = {
        //       addFrom: JSON.stringify(that.addFrom)
        //     };
        //     accountManagementAdd.saveAccountInputApi(request, function (data) {
        //         data = data.data;
        //         if(data.code === '0001') {
        //           that.$Message.error("保存账号失败");
        //           return;
        //         }
        //         if(data.code === '0002') {
        //           that.$Message.info("账号已经存在（登录账号不能重复）");
        //           return;
        //         }
        //         if(data.code === '0000') {
        //           that.$Message.success("保存账号成功");
        //           that.$router.push({path:'/account/management'});
        //         }
        //     })
        //
        //   });
        //
        // },
        // //添加账号取消
        // addAccountCancel : function () {
        //   this.$router.push({path:'/account/management'});
        // },
        // //角色改变
        // roleChange(roleBean) {
        //   if(roleBean.code === 'DZ-DIANZHANG'){
        //     this.shopSelectDisplay = true;
        //     this.listShop();
        //   } else {
        //     this.shopSelectDisplay = false;
        //     this.addFrom.shopId = null;
        //   }
        // },
        // //所有店铺
        // listShop() {
        //   let that = this;
        //   that.shopList = [];
        //   accountManagementAdd.listShopApi({}, function (data) {
        //     data = data.data;
        //     if(data.code === '0001') {
        //       that.$Message.error("查询店铺失败");
        //       return;
        //     }
        //     if(data.code === '0000') {
        //       let row = data.results;
        //       for(let i = 0 ; i < row.length ; i++) {
        //         that.shopList.push(row[i]);
        //       }
        //     }
        //   });
        // },

      }

    }
</script>

<style scoped>

</style>
