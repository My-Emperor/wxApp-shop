// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabNames:{
      type:Array,
      default:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //tab点击事件
    handleItemTap(e){
      const {index} = e.currentTarget.dataset;
      //向父组件发送自定义事件
      this.triggerEvent("tabsItemChange",{index:index})
    }
  }
})
