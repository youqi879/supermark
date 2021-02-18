<template>
	<!-- 首页 -->
<div id="home" class="wrapper">
	<!-- 购物车置顶 -->
 <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
 <tab-control
  :titles="['流行','新款','精选']" 
 @tabClick="tabClick"
 ref="TabControl1"
 class="tab-control"
 v-show="isTabFixed"
 ></tab-control>
 <!-- 滚动区域 -->
 <Scroll class="content" 
   ref="scroll"   
   :probe-type="3" 
   @scroll="contentScroll" 
   :pull-up-load="true"
   @pullingUp="loadMore"> 
   <!-- 轮播图 获取tabControl上方高度-->
   <!-- 不太理解 -->
    <HomeSwiper :banners="banners" @swiperImageLoad="SwiperImageLoad"></HomeSwiper>
   <!-- 轮播图下面的四张图“十点抢券” “好物特卖”“内购福利”“初秋上新” -->
    <RecommendViews :recommends="recommends" ></RecommendViews>
	<!-- 一张大图	  -->
    <FeatureView></FeatureView>
	<!-- 菜单导航栏：流行 新款 精选 -->
    <tab-control 
          :titles="['流行','新款','精选']" 
         @tabClick="tabClick"
		 ref="TabControl2"
    ></tab-control>
	<!-- 商品列表 -->
    <GoodsList :goods="showGoods"></GoodsList>
</Scroll>
<!-- 返回顶部图标 -->
  <back-top  @backClick="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	
	import HomeSwiper from './childCompos/HomeSwiper.vue'
	import RecommendViews from './childCompos/RecommendViews.vue'
	import FeatureView from './childCompos/FeatureView.vue'
	
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import BackTop from '../../components/content/backTop/BackTop.vue'
	
	import {getHomeMultidata,getHomeGoods}  from '../../network/home.js'
	import {debounce} from '../../common/utils.js'
		
	export default{
		name:'Home',
		components:{
			NavBar,
			HomeSwiper,
			RecommendViews,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
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
			currentType:'pop',
			isShowBackTop:false,
			tabOffsetTop:0,
			isTabFixed:false,
			saveY:0
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
		destroyed() {
			console.log('home destroyed');
		},
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0);
			this.$refs.scroll.refresh();
			console.log(this.saveY)
		},
		deactivated(){
			this.saveY=this.$refs.scroll.getScrollY();
		
		},
		mounted() {
			const refresh=debounce(this.$refs.scroll.refresh,50)
			//监听item中途图片加载完成
			this.$bus.$on('itemImageLoad',()=>{
				refresh()
				console.log('-------')
			})
			
		},
		methods:{
			//事件监听相关方法
			// 根据index值传入不同的数据
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
				if(this.$refs.TabControl1!==undefined && this.$refs.TabControl2!==undefined)
				{
				this.$refs.TabControl2.currentIndex=index;
				this.$refs.TabControl1.currentIndex=index;}
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0) //回到顶部
				console.log('11111')
				//console.log(this.position)
			},
			// backTop() {
			//   this.$refs.scroll.scrollTo(0, 0, 300)
			// },
			contentScroll(position){
				//1.判断BackTop是否显示
				this.isShowBackTop= (-position.y)>608
				//2.决定TabControl是否吸顶(position:fixed)
				this.isTabFixed=(-position.y)>700
			},
			loadMore(){
				//默认加载一次  如需再次加载 每次加载完成都需要结束加载  然后重新加载
				this.getHomeGoods(this.currentType) 
				console.log('加载更多的方法')
			},
			SwiperImageLoad(){
				//2.获取tabControl的offsetTop
				//所有组件都有一个属性$el:用于获取组件中元素
				console.log(this.$refs.TabControl2.$el.offsetTop);
				this.tabOffsetTop=this.$refs.TabControl2.$el.offsetTop;
			},
			//网络请求相关代码
			getHomeMultidata(){
				getHomeMultidata().then(res=>{
					//console.log(res);
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
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()   
				})
			}
			
		}
		
	}
	
</script>

<style>
	#home{
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
	/* 	position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	tab-control{
		position: relative;
		z-index: 9;
	}
	/* .tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	/* .content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
  
	} */
	/* .fixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
	} */
	.content{
		height: calc(100%-93px);
		overflow: hidden; 
	}
	.wrapper {
		    position: positive;
            height:677px;
            overflow: hidden;
        }
	
</style>
