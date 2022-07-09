import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';


import BaseModule from './components/ui/BaseModule.vue';
import BaseButton from './components/ui/BaseButton.vue';
import PostElement from './components/layout/PostElement.vue';
import EmojiPopUp from './components/ui/EmojiPopUp.vue'

const app = createApp(App);


app.use(router);

app.component('base-module', BaseModule);
app.component('base-button', BaseButton);
app.component('post-element', PostElement);
app.component('emoji-pop-up', EmojiPopUp);

app.mount('#app');
