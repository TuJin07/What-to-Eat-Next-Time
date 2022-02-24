Page({
  data: {
    list:[
      {
        id:0,
        name:"丁香",
        value:"丁香"
      },
      {
        id:1,
        name:"海棠",
        value:"海棠"
      },
      {
        id:2,
        name:"竹园",
        value:"竹园"
      },
      {
        id:3,
        name:"综合楼",
        value:"综合楼"
      }
    ],
    checkedList:[],
    food:"要吃什么捏",
    interval:"",
    arr :[],
    flag: false,
    click: " 试试运气！",
    db_food:"",
    _:"",
    backgroundColor: "#ffffff",
    fontColor: "white",
    pic: "/images/默认.jpg"
  },

  /**
   * button点击事件监听
   */
  clickStartButton: function(e) {
    var that = this;
    var flag = this.data.flag;
    this.setData({
      flag:!flag
    })

    if(flag == false){
      this.data.interval = setInterval(function(){
        var num = Math.floor(Math.random()*that.data.arr.length);
        var food = "";
        if(that.data.arr == undefined || that.data.arr[num] == undefined){
          that.setData({
            click: "请稍等.."
          })
        }else{
            that.setData({
              pic:"/images/抽取中.jpg",
              food: that.data.arr[num].name,
              click: " 就吃这个吧 !"
            })
        }
      },50)
    }else{
      this.setData({
        pic:"/images/已抽取.jpg",
        click: "  不满意，再来！"
      })
      clearInterval(this.data.interval);
    }
  },

  /**
   * 复选框选中事件
   * */
  HandelItemChange(e){
    var that = this;
    var arr = ["yummy"];
    var db_food = this.data.db_food;
    var _ = this.data._;

    // 获取被选中的复选框的值
    const checkedList = e.detail.value;
    this.setData({
      checkedList:checkedList
    })

    /**
     * 读入restraurant选择框数据
     */
    if(typeof(getApp().globalData.disableBusiness)==="undefined"){
      getApp().globalData.disableBusiness=[[],[],[],[]];
    }
    var a = getApp().globalData.disableBusiness[0];
    var b = getApp().globalData.disableBusiness[1];
    var c = getApp().globalData.disableBusiness[2];
    var d = getApp().globalData.disableBusiness[3];
    
    db_food.where({
      // 在复选框选中范围中
      location:_.in(this.data.checkedList),
      name: _.nin(a)
      .and(_.nin(b))
      .and(_.nin(c))
      .and(_.nin(d)),
    })
    .field({
      _id:false,
      name:true
    })
    .get({
      success: function(res) {
        //console.log(checkedList);
        //console.log(res.data);
        //console.log(a);
        //arr = res.data; 
        that.setData({
          arr: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读入数据库数据
    const db = wx.cloud.database();
    const food = db.collection('food');
    const _ = db.command;
    this.setData({
      db_food:food,
      _:_
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})