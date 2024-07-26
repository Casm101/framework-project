// Module imports
import { createApp } from 'vue';

// App and router imports
import App from './App.vue';
import router from './router';

// Style imports
import './styles/global.scss';


createApp(App).use(router).mount('#app');
