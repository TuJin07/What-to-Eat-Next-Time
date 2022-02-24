Page({
    data: {
        backgroundColor: "#e7edf3",
        fontColor: "black",
        list:[],
        isLoading:true
    },

    onLoad: function (options) {
        const db = wx.cloud.database();
        const food = db.collection('food');
        const _ = db.command;
        var that = this;
        food.where({
            location:"综合楼"
        }).field({
            _id:false, name:true
        }).get({
            success: function(res) {
                if(typeof(getApp().globalData.disableBusiness)==="undefined"){
                    getApp().globalData.disableBusiness=[[],[],[],[]];
                }
                var tmp = [];
                for(var i in res.data){
                    if(getApp().globalData.disableBusiness[0].indexOf(res.data[i].name)>-1){
                        tmp.push("true");
                    }else{
                        tmp.push("");
                    }
                }
                var arr = res.data;
                arr.sort((a, b) => b.name.localeCompare(a.name));
                that.setData({
                    list:arr,
                    checked:tmp,
                    isLoading:false
                })
           }
        });
    },

    checkboxChange:function(e){
        getApp().globalData.disableBusiness[0]=e.detail.value;
    }
})