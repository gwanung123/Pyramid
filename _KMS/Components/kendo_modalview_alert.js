define(["jquery", "kendo"],
    function($) {
        
        /*
            ModalviewAlert
            options : {
                width : "px",
                height : "px",
                modal : true,
                title: "simple modal",
                closeTime: 0            closeTime > 1000
            }
        */
        function ModalviewAlert(domID, options) {
            console.log("[modalview_alert] :: ModalviewAlert : load");
            var self = this;
            
            self.options = options;
            
            $("#"+domID+"_alert").empty();
            
            self.alert = $('<div id="'+domID+'_alert"></div>').kendoWindow({
                appendTo: $(domID),
                visible : false,
                width   : options.width   || "300px",
                height  : options.height  || "100px",
                modal   : true,
                title   : options.title   || "알림",
                content : { template : "<p class='selectpanel_msg'>" + options.content + "</p>"},
                open: self._onOpen,
                activate: self._onActivate,
                close: self._onClose,
                deactivate: self._onDeactivate,
            });
            
            return self;
        };
        
        ModalviewAlert.prototype.open = function() {
            console.log("[modalview_alert] :: ModalviewAlert : open");
            var self = this;
            var alert = self.alert.data("kendoWindow");
            alert.center().open();
            
            var closeTime = self.options.closeTime;
            if ( closeTime > 0 ) {
                setTimeout(function() {
                    self.close();
                }, closeTime);
            }
        };
        
        ModalviewAlert.prototype.close = function() {
            console.log("[modalview_alert] :: ModalviewAlert : close");
            var self = this;
            var alert = self.alert.data("kendoWindow");
            alert.close();
            alert.destroy();
        };
        
        ModalviewAlert.prototype._onOpen = function(e) {
            console.log("[modalview_alert] :: ModalviewAlert : _onOpen");
        };
        
        ModalviewAlert.prototype._onActivate = function(e) {
            console.log("[modalview_alert] :: ModalviewAlert : _onActivate");
        };
        
        ModalviewAlert.prototype._onClose = function(e) {
            console.log("[modalview_alert] :: ModalviewAlert : _onClose");
            
        };
        
        ModalviewAlert.prototype._onDeactivate = function(e) {
            console.log("[modalview_alert] :: ModalviewAlert : _onDeactivate");
            
        };

        return ModalviewAlert;
    }   
);