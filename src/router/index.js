import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';

Vue.use(VueRouter);

//  路由 返回的是页面
export default new VueRouter(
  {
    // routerlinkexactactive: 'active',
    linkActiveClass: 'active',
    routes: [
      {
        path: '/goods',
        component: goods
      }, {
        path: '/ratings',
        component: ratings
      },
      {
        path: '/seller',
        component: seller
      }
    ]
  }
);
