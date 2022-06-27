import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Settings from '../pages/Settings.vue';
import Timeline from '../pages/Timeline.vue';

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login,
    children:[
      { path: '/signup', component: null },
    ]},
    { path: '/timeline', component: Timeline,
      children:[
        { path: '/makeapost',component: null}
      ]},
    { path: '/post/:id', component: null },
    { path: '/settings', component: Settings,
      component: null,
      children:[
        { path: '/delteaccount', component: null },
        { path: '/changepassword', component: null },
        { path: '/changeemail', component: null },
        { path: 'updateprofilepicture', component: null },
      ]},
  ],
});

export default router;
