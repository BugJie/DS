import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入Echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
    // 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

// 发送
axios.interceptors.request.use((res) => {
    let token = sessionStorage.getItem('token');
    if (token) {
        res.headers.Authorization = window.sessionStorage.getItem('token')
    }
    return res
}, (err) => {
    return Promise.reject(err)
})

// 响应
axios.interceptors.response.use((response) => {
    if (response.data.status == 200) {
        router.replace('/about')
    }
    return response.data;
}, (err) => {
    return Promise.reject(err)
})

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')