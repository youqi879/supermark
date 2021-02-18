<template>
	<!-- 详情页 -->
	<div id="detail">
	<!-- 顶部导航条 商品 参数 评论 推荐 -->
	<detail-item class="detail-nav" @titleClick="titleClick" ref="nav"></detail-item>
	<!-- 滚动区域 -->
	<scroll 
	class="content" 
	ref="scroll" 
	:probe-type="3" 
	@scroll="contentScroll">
	<!-- <ul>
		<li v-for='item in $store.state.cartList'>{{item}}</li>
	</ul> -->
	<!-- 详情页轮播图 -->
	<detail-swiper :top-images="topImages"></detail-swiper>
	<!-- 商品信息 -->
	<detail-base-info :goods="goods"></detail-base-info>
	<!-- 店铺信息 -->
	<detail-shop-info :shop="shop"></detail-shop-info>
	<!-- 商品的穿着效果 -->
	<detail-goods-info :detailInfo="detailInfo"  @imageLoad="imageLoad" class="detail-goods"></detail-goods-info>
	<!-- 参数信息 -->
	<detail-param-info :paramInfo="paramInfo" ref="params" ></detail-param-info>
	<!-- 评论信息 -->
	<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
	<!-- 商品推荐 -->
	<goods-list :goods="recommends" ref="recommend"></goods-list>
	</scroll>
	<!-- 底部导航 客服 店铺 收藏 加入购物车 -->
	<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
	<!-- 回到顶部图标 -->
	<back-top @click.native="backTop" v-show="isShowBackTop"/>
	<!-- <toast :message="message" :show="show"></toast> -->
	</div>
</template>

<script>
	import DetailItem from './childCompos/DetailItem.vue'
	import detailSwiper from './childCompos/detailSwiper.vue'
	import DetailBaseInfo from './childCompos/DetailBaseInfo.vue'
	import DetailShopInfo from './childCompos/DetailShopInfo.vue'
	import DetailGoodsInfo from './childCompos/DetailGoodsInfo.vue'
	import DetailParamInfo from './childCompos/DetailParamInfo.vue'
	import DetailCommentInfo from './childCompos/DetailCommentInfo.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import DetailBottomBar from './childCompos/DetailBottomBar.vue'
	// import Toast from '../../components/common/toast/Toast.vue'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	import {debounce} from '../../common/utils.js'
	import {backTopMixin} from '../../common/mixin.js'
	
	import { mapActions } from 'vuex'
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
	export default{
		name:"Detail",
		components:{
			DetailItem,
			detailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			// Toast,
			Scroll
		},
		mixins:[backTopMixin],
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopYs:[],
				getThemeTopYs:null,
				currentIndex:0,
				// message:'',
				// show:false
				
			}
		},
		created() {
			//1.保存传入的iid
			this.iid=this.$route.params.iid
			//2/根据iid请求详情数据
			getDetail(this.iid).then(res=>{
				//1)获取顶部轮播图数据
				const data=res.result;
				console.log(res);
				this.topImages=data.itemInfo.topImages
				//2)获取商品数据
				this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
			  //console.log(this.goods)
				//3)获取店铺信息
				this.shop=new Shop(data.shopInfo)
				//3)保存商品的详情数据
				this.detailInfo=data.detailInfo;
				//4)获取商品参数
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				 //5取出评论信息
				if(data.rate.cRate !==0){
					 this.commentInfo=data.rate.list[0]
				 }
			 })
			   //3 请求推荐数据
                getRecommend().then(res =>{
                      this.recommends = res.data.list
           	})
			//4 给getThemeTopYs赋值,对themeTopYs进行防抖 目的是提高性能
				this.getThemeTopYs = debounce(() => {
						this.themeTopYs=[]
						this.themeTopYs.push(0);
						this.themeTopYs.push(this.$refs.params.$el.offsetTop);
						this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
						this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
						this.themeTopYs.push(Number.MAX_VALUE);
						console.log(this.themeTopYs)
				},100)
				//点击评论参数 跳到对应的位置
				// this.$nextTick(()=>{
				// 	this.themeTopYs=[]
				// 	this.themeTopYs.push(0)
				// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				// 	console.log(this.themeTopYs)
				// })
		},
		methods:{
			// 使用 [] 是解构赋值 映射为 `this.$store.dispatch('addCart')`
			...mapActions(['addCart']),  
			//detail-goods-info的imageLoad方法 获取正确的图片高度
			imageLoad(){
				this.$refs.scroll.refresh()
				this.getThemeTopYs()
			},
			titleClick(index){
				//console.log(index)
				//返回后回到之前的位置
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100) 
			},
			contentScroll(position){
				//console.log(position)
				//1 获取Y值
				const positionY=-position.y
				//2 position和主题中的值进行对比
				//[0,7838,9120,9452]
				//positionY在0和7838之间，index=0
				//positionY在7838和9120之间，index=1
				//positionY在9120和9452之间，index=2
				//positionY大于9452，index=3
				let length=this.themeTopYs.length
				for(let i=0;i<length-1;i++){
					//1.普通做法
					// if(this.currentIndex!==i &&
					// ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
					// || (i===length-1 && positionY>this.themeTopYs[i]))){
					// 	this.currentIndex=i;
					// 	console.log(currentIndex)
					// 	this.$refs.nav.currentIndex=this.currentIndex
					// }
					//方法2 hack做法
					if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
						this.currentIndex=i;
						this.$refs.nav.currentIndex=this.currentIndex
					}
				}
				//是否显示回到顶部
				this.listenShowBackTop(position)
				
			},
		    addToCart(){
				//console.log('---------')
				//1 获取购物车需要展示的信息
				const product={}
				product.image=this.topImages[0];
				product.title=this.goods.title;
				product.desc=this.goods.desc;
				product.price=this.goods.realPrice;
				product.iid=this.iid;
				
				//2 将商品加到购物车(1.Promise 2.mapActions) 触发异步任务actions
				this.addCart(product).then(res=>{
					//console.log(res)
					//console.log(this.$toast)
					this.$toast.show(res,10000)
				})
				//this.$store.cartList.push(product)
				//this.$store.commit('addCart',product)
				//3 普通模式将商品加到购物车
				// this.$store.dispatch('addCart',product).then(res=>{
				// 	console.log(res);
				// })
			}
		}
		
	
	}
	
</script>

<style scoped>
	#detail{
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100hv;
	}
	/* .detail-goods{
		position: fixed;
	} */
/* 	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #fff;
	} */
	
	.content{
		height: calc(100%-93px);
	}

</style>
