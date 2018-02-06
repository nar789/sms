var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    onBackKeyDown:function() {
        
    },
    onDeviceReady: function() {
        window.addEventListener("message",function(e){
            var d=e.data;
        
            
        },false);
    }
};

app.initialize();