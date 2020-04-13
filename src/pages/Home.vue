<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">

        <div style="margin-top: 40px;margin-bottom: 20px;font-weight: bold;font-size: 30px;color: #ffffff;">
          <Avatar size="36"></Avatar>
          <span>拓客营销</span>
        </div>

        <Menu :active-name="selectedItemName" theme="dark" width="auto" :class="menuitemClasses" @on-select="onSelectLister" :accordion="true">
          <Submenu :name="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <Icon type="ios-paper" />
              {{item.name}}
            </template>
            <MenuItem :name="cItem.id" :to="cItem.url" v-for="cItem in item.subMenuList" :key="cItem.id">{{cItem.name}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
<!--        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>-->
        <Content :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>{{selectedMenu}}</BreadcrumbItem>
            <BreadcrumbItem>{{selectedSubMenu}}</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div :style="{'height':mHeight + 'px'}">
              <router-view/>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  provide(){
    return{
      checkParamBlank:this.checkParamBlank,
    };
  },
  data() {
    return {
      isCollapsed: false,
      mHeight: 600,
      selectedItemName: '',
      selectedMenu: '',
      selectedSubMenu: '',
      menuList: [
        {
          id: 1,
          'name': '设置管理',
          'url': 'setting',
          subMenuList: [
            {
              'id': 2,
              'name': '账户管理',
              'url': '/account/manager'
            },
            {
              'id': 3,
              'name': '角色管理',
              'url': '/role/manager'
            }
          ]
        },
        {
          id: 4,
          'name': '门店推广',
          'url': 'shop',
          subMenuList: [
            {
              'id': 5,
              'name': '推广管理',
              'url': '/shop/increase/manager'
            },
            {
              'id': 6,
              'name': '推广数据',
              'url': '/shop/increase/data'
            }
          ]
        },
        {
          id: 7,
          'name': '数据中心',
          'url': 'data',
          subMenuList: [
            {
              'id': 8,
              'name': '客户数据',
              'url': '/customer/view'
            },
            {
              'id': 9,
              'name': '客户数据明细',
              'url': '/customer/data/detail'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.mHeight = window.screen.availHeight - 22;

    this.selectedItemName = this.menuList[1].subMenuList[0].id;
    this.selectedMenu = this.menuList[1].name;
    this.selectedSubMenu = this.menuList[1].subMenuList[0].name;
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    onSelectLister (val) {
      for (let i = 0; i < this.menuList.length; i++) {
        let item = this.menuList[i];
        for (let k = 0; k < item.subMenuList.length; k++) {
          let cItem = item.subMenuList[k];
          if (cItem.id === val) {
            this.selectedMenu = item.name;
            this.selectedSubMenu = cItem.name;
          }
        }
      }
    },
    //对象属性空检查
    checkParamBlank: function(obj){
      for(let param in obj){
        obj[param] = this.checkBlank(obj[param]);
      }
    },
    //数据空检查
    checkBlank: function(data){
      if(!data){
        return "--";
      }else{
        return data;
      }
    }
  }
}
</script>
<style scoped>

  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
