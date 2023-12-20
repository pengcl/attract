import App from './App.vue';
import {dictSvc} from "./common/dictSvc";

const host = 'https://unidemo.dcloud.net.cn/';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$host = host;
App.mpType = 'app';
const app = new Vue({
	  ...App
	})
// app.$mount();

const start = async ()=>{
	const res = await dictSvc.all();
		const map = {};
		res.forEach(item => {
			map[item.id] = item.value;
		});
		dictSvc.setMap(map);
		app.$mount();
}
start();
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
