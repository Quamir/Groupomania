import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Settings from '../pages/Settings.vue';
import Timeline from '../pages/Timeline.vue';
import Post from '../pages/Post.vue';
import ProfilePage from '../pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login,
    children:[
      { path: '/signup', component: Login },
    ]},
    { path: '/timeline', component: Timeline,
      children:[
        { path: '/makeapost',component: Timeline }
      ]},
    { path: '/post/', component: Post },
    { path: '/settings', component: Settings,
      children:[
        { path: '/deleteaccount', component: Settings },
        { path: '/changepassword', component: Settings },
        { path: '/changeemail', component: Settings },
        { path: '/changename', component: Settings },
        { path: '/updateprofilepicture', component: Settings }
      ]},
    { path: '/profile/:id', component: ProfilePage}
  ],
});

export default router;
