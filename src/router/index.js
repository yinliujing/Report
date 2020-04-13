import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login';
import ExternalContact from '@/pages/ExternalContact';
import Home from '@/pages/Home';
import AccountManager from '@/pages/user/AccountManager';
import AccountManagerAdd from '@/pages/user/AccountManagerAdd';
import AccountManagerUpload from '@/pages/user/AccountManagerUpload';
import RoleManager from '@/pages/user/RoleManager';
import IncreaseManager from '@/pages/shop/IncreaseManager';
import CustomerView from "@/pages/CustomerView";
import CustomerDetail from "@/pages/CustomerDetail";
import IncreaseData from '@/pages/shop/IncreaseData';
import IncreaseDataRegion from '@/pages/shop/IncreaseDataRegion';
import IncreaseDataStaff from '@/pages/shop/IncreaseDataStaff';
import IncreaseDataStore from '@/pages/shop/IncreaseDataStore';
import IncreaseStaffManager from '@/pages/shop/IncreaseStaffManager';
import IncreaseStoreManager from '@/pages/shop/IncreaseStoreManager';


Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: '/kiisoo-ic',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/external/contact',
      name: 'externalContact',
      component: ExternalContact
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [

        {
          path: '/account/manager',
          name: 'AccountManager',
          component: AccountManager
        },
        {
          path: '/account/management/add',
          name: 'AccountManagerAdd',
          component: AccountManagerAdd
        },
        {
          path: '/account/management/upload',
          name: 'AccountManagerUpload',
          component: AccountManagerUpload
        },
        {
          path: '/role/manager',
          name: 'RoleManager',
          component: RoleManager
        },
        {
          path: '/shop/increase/manager',
          name: 'IncreaseManager',
          component: IncreaseManager,
          children: [
            {
              path: '/',
              redirect: '/shop/increase/manager/store'
            },
            {
              path: '/shop/increase/manager/store',
              name: 'IncreaseStoreManager',
              component: IncreaseStoreManager
            },
            {
              path: '/shop/increase/manager/staff',
              name: 'IncreaseStaffManager',
              component: IncreaseStaffManager
            }
          ]
        },
        {
          path: '/shop/increase/data',
          name: 'IncreaseData',
          component: IncreaseData,
          children: [
            {
              path: '/',
              redirect: '/shop/increase/data/region'
            },
            {
              path: '/shop/increase/data/region',
              name: 'IncreaseDataRegion',
              component: IncreaseDataRegion
            },
            {
              path: '/shop/increase/data/store',
              name: 'IncreaseDataStore',
              component: IncreaseDataStore
            },
            {
              path: '/shop/increase/data/staff',
              name: 'IncreaseDataStaff',
              component: IncreaseDataStaff
            },
          ]
        },
        {
          path: '/customer/view',
          name: 'CustomerView',
          component: CustomerView,
        },
        {
          path: '/customer/data/detail',
          name: 'CustomerDetail',
          component: CustomerDetail,
        }
      ]
    }
  ]
});
/*
* 跳转前的处理事件
* */
router.beforeEach(function (to, from, next) {
  next();
});

export default router
