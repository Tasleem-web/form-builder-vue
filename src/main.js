import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// const app = createApp(App).use(Antd);
// app.mount("#app");

// createApp(App).mount('#app')

import mitt from 'mitt'

const eventBus = mitt()
const app = createApp(App).use(Antd);

app.config.globalProperties.eventBus = eventBus
app.mount('#app')