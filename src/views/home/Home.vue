<template>
<div id="home">
 <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
 <HomeSwiper :banners="banners"></HomeSwiper>
 <RecommendViews :recommends="recommends" ></RecommendViews>
 <FeatureView></FeatureView>
 <tab-control 
 :titles="['流行','新款','精选']" 
 class="tab-control"  
 @tabClick="tabClick"></tab-control>
 <GoodsList :goods="showGoods"></GoodsList>
  <ul>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
	  <li>1234</li>
  </ul>
  </div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	
	import HomeSwiper from './childCompos/HomeSwiper.vue'
	import RecommendViews from './childCompos/RecommendViews.vue'
	import FeatureView from './childCompos/FeatureView.vue'
	
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	
	import {getHomeMultidata,getHomeGoods}  from '../../network/home.js'
		
	export default{
		name:'Home',
		components:{
			NavBar,
			HomeSwiper,
			RecommendViews,
			FeatureView,
			TabControl,
			GoodsList
			
		},
		data(){
			return { 
			banners:[],
			recommends:[],
			goods:{
				'pop':{page:0,list:[]},
				'new':{page:0,list:[]},
				'sell':{page:0,list:[]},
			},
			currentType:'pop'
		
		}	
			
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created() {
			//请求多个数据
			this.getHomeMultidata()	
		    //请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		 
		},
		methods:{
			//事件监听相关方法
			tabClick(index){
				//console.log(index);
				switch(index){
					case 0:
					this.currentType='pop'
					break
					case 1:
					this.currentType='new'
					break
					case 2:
					this.currentType='sell'
					break
					
				}
			},
			//网络请求相关代码
			getHomeMultidata(){
				getHomeMultidata().then(res=>{
					console.log(res);
					//this.result=res;
					this.banners=res.data.banner.list;
					this.recommends=res.data.recommend.list;
					})
			},
			getHomeGoods(type){
				const page=this.goods[type].page + 1
				getHomeGoods(type,page).then(res=>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page+=1
				})
			}
			
		}
		
	}
	
</script>

<style>
	#home{
		margin-top: 44px;
		/* height: 100vh;
		 position: relative; */
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	}
</style>
