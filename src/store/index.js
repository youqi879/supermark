import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//2.创建Store对象
const state={
		cartList:[],
		
	}
const store=new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
//3.挂载到实例上
export default store