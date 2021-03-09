//首页同时发送三个请求,导致刷新提示调用三次,而提前请求结束的一次请求会关闭刷新框,导致刷新提示异常
//处理同时请求时刷新提示提前关闭情况
let ajaxNum = 0;
export const request=(params)=>{
  ajaxNum++;
  //处理数据显示刷新中
  //在当前页面显示导航条加载动画
  wx.showNavigationBarLoading();
  //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxNum--;
        if (ajaxNum === 0){
          //无论请求是否成功 都执行关闭刷新提示
          wx.hideLoading();
          wx.hideNavigationBarLoading();
        }
      }
    });
  })
}