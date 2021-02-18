import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types.js'
export default{
		addCart(context,payload){
			return new Promise((resolve,reject)=>{
				//state.cartList.push('payload')
				//1.查找之前数组中是否有该商品
				let oldProduct=context.state.cartList.find(item => item.iid === payload.iid)
				//2 判断oldproduct
				if(oldProduct){ //数量+1
					//oldProduct.count+=1
					context.commit(ADD_COUNTER,oldProduct)
					resolve('当前商品数量加一')
				} else{//添加新的商品
					payload.count=1
					//state.cartList.push(payload)
					context.commit(ADD_TO_CART,payload)
					resolve('添加新的商品')
				}
			})
			
		}
	}