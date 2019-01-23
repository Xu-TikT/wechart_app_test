var config=require('/config.js');
var common = require('common.js');

//需要token才能访问的数组
var methodToken = ['user.info', 'user.editinfo', 'cart.getlist', 'user.goodscollection', 'cart.add', 'cart.del', 'cart.setnums', 'user.saveusership', 'order.create', 'user.goodsbrowsing', 'user.pay', 'payments.getinfo', 'order.getorderlist', 'order.cancel', 'order.getorderstatusnum', 'user.delgoodsbrowsing', 'user.goodscollectionlist', 'coupon.getcoupon', 'coupon.usercoupon', 'order.details', 'order.confirm', 'user.orderevaluate', 'order.aftersalesstatus', 'order.addaftersales', 'order.aftersalesinfo', 'order.aftersaleslist', 'order.sendreship', 'order.iscomment', 'user.getuserdefaultship', 'user.changeavatar', 'user.issign', 'user.sign', 'user.pointlog', 'user.getdefaultbankcard', 'user.getbankcardlist', 'user.getbankcardinfo', 'user.cash', 'user.setdefaultbankcard', 'user.removebankcard', 'user.addbankcard', 'user.cashlist', 'user.balancelist', 'user.recommend', 'user.sharecode', 'user.getusership', 'user.vuesaveusership', 'user.removeship', 'user.setdefship', 'user.getshipdetail', 'user.editship', 'user.getuserpoint', 'store.isclerk', 'store.storeladinglist', 'store.getdefaultstore', 'store.ladingdel', 'store.ladinginfo', 'store.lading', 'coupon.getcouponkey', 'user.myinvite', 'user.activationinvite', 'cart.getnumber'];

//接口统一封装
function api(method, data, callback, show = true) {
  //如果是需要登陆的，增加token
  if (methodToken.indexOf(method) >= 0) {
    var userToken = wx.getStorageSync('userToken');
    if (!userToken) {
      common.jumpToLogin();
    } else {
      data.token = userToken;
      data.method = method;
      post(data, callback, show);
    }
  } else {
    data.method = method;
    post(data, callback, show);
  }

};

//post请求
function post(data, callback, show) {
  if (show) {
    wx.showLoading({
      title: '载入中...'
    });
  }
  wx.request({
    url: config.api_url + 'api.html',
    data: data,
    method: 'POST',
    success: function (res) {
      if (show) {
        wx.hideLoading();
      }
      //这里做判断，如果不报错就返回，如果报错，就做错误处理
      if (res.data.status) {
        callback(res.data);
      } else {
        error(res.data, callback, data);
      }
    },
    fail: function (res) {
      if (show) {
        wx.hideLoading();
      }
      return {
        status: false,
        data: res.data,
        msg: '接口调用失败',
      };
    },
    complete: function (res) {

    }
  });
};

//商品列表查询接口
function goodsList(data, callback) {
  var newData = {};
  newData = common.deepCopy(newData, data);
  //把data里的where换成json
  if (data.where) {
    newData.where = JSON.stringify(data.where);
  }
  //把排序换成字符串
  if (data.order) {
    var sort = data.order.key + ' ' + data.order.sort;
    if (data.order.key != 'sort') {
      sort = sort + ',sort asc'   //如果不是综合排序，增加上第二个排序优先级排序
    }
    newData.order = sort;
  } else {
    newData.order = 'sort asc';
  }
  api('goods.getlist', newData, function (res) {
    callback(res);
  });
};



module.exports = {
  goodsList: goodsList,
}
