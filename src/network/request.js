import axios from 'axios'
//2
export function request(config){
  //1.创建axios的实例
   const instance=axios.create({
      baseURL:'http://152.136.185.210:7878/api/m5',
      timeout:5000
      })
//axios的拦截器
//2.1请求器的作用
instance.interceptors.request.use(config=>{
  //1 比如config中一些信息不符合服务器要求的要求
  //2 比如每次发送网络请求的时，都希望界面上显示一个请求的图标
  //3 某些网络请求(比如登录(token)),必须携带一些特殊的信息
  return config
},err=>{

})

//2.1 响应拦截
instance.interceptors.response.use(res=>{
 return res.data
},err=>{
  console.log(err)
})


return instance(config)}