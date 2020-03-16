import msgboxVue from './MsBox.vue';    
// 定义插件对象
const MessageBox = {};
// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue) {
  const MessageBoxInstance = Vue.extend(msgboxVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = {
    showMsgBox (options) {
      var reset = {
        title:'',
        content: '訊息內容',
        isShowBtn1:false,
        isShowBtn2:false,
        isShowBtn3:false,
        isShow404: false,
        isShow500: false,
        isShowAgent:false,
        isNormalBox:false,
        isShowClose:false,
        fn1: function() { this.isShowMessageBox = false; },
        fn2: function() { this.isShowMessageBox = false; },
        fn3: function() { this.isShowMessageBox = false; },
        BtnText1:"Cancel",
        BtnText2:"Confirm",
        BtnText3:"拆單",
        titleClass:"btntitle",
        timeOut:0,
        btnClass:"btnall",
        onceClick: false,
        fntimeout:function() { },
    }
      // Object.assign(currentMsg, reset);
      if (!currentMsg) {
        initInstance();
      }
      // closeBox();
      Object.assign(currentMsg, reset);
      if (typeof options === 'string') {
        currentMsg.content = options;
        // currentMsg.propE = options;
      } else if (typeof options === 'object') {
        if (options.content.length <20){
          options.content = "<div>"+options.content+"</div>"
        }
        Object.assign(currentMsg, options);
        
        if(currentMsg.timeOut != 0 ){
          currentMsg.timeClose(currentMsg.fntimeout)
        }
      }
      if(typeof options === 'number'){
        // currentMsg.timeOut = options
        
      }
      return currentMsg.showMsgBox()
        .then(val => {
          currentMsg = null;
          return Promise.resolve(val);
        })
        .catch(err => {
          currentMsg = null;
          return Promise.reject(err);
        });
      
    },
    closeBox(){
      currentMsg.closewindow();
    }
  };

};
export default MessageBox;