'use strict';

define([
      "nxbinder",
      "../../../Models/models.permit",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _PERMIT, _TEXT, _Components ) {

      function containerSettingViewModel( win ) {

         console.log("[containerSetting] :: containerSettingViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;

         this._mydbms = this._dbms[win.others.joinBind.dbms];
         this._shared = this._nexus.get("shared");

         this._permit = _PERMIT[this._nexus.get("permit")];

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerSetting] :: containerSettingViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_SETTING.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function() {
               var that = this;

               that._viewCenter.init();
            },
            _viewCenter : {
               handle : undefined,
               dialog : {},
               init : function() {
                  var it = this;
                  var text = self._getText(win.others.joinBind.text),
                      defineBlock = self._setObservable("viewCenter");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;
               },
               customBind : function( domID, main ) {
                  var self = main,
                      it = self._setTemplates._viewCenter;
                  var digID = "nx-setting-dialog",
                      btnDom = $("#" + self.domID + " #nx-setting-button"),
                      content = "<h7><b>> SEARCH</b></h7>" +
                                "<div class=\"nx-ccc-input\">" +
                                   "<label class=\"nx-ccc-title\">BETWEEN : </label>" +
                                   "<input id=\"nx-date-start\" style=\"width: 125px\"/>" +
                                   " - " +
                                   "<input id=\"nx-date-end\" style=\"width: 125px\"/>" +
                                "</div>" +
                                "<div class=\"nx-ccc-input\">" +
                                   "<label class=\"nx-ccc-title\">CCC-TYPE : </label>" +
                                   "<input id=\"nx-type\" />" +
                                   "<a class=\"k-button nx-search-button\" href=\"\\#\">Search</a>" +
                                "</div>" +
                                "<p class=\"nx-separator\"></p>" +
                                "<h7><b>> SELECT</b></h7>" +
                                "<div class=\"nx-ccc-input\">" +
                                   "<label class=\"nx-ccc-title\">CCC-CODE : </label>" +
                                   "<input id=\"nx-code\" />" +
                                "</div>";

                  var itemDom = btnDom.children("#" + digID);
                  if ( itemDom.length > 0 ) {
                     it.dialog[digID].destroy();
                     itemDom.remove();
                  }

                  _binder.appendDIV("nx-setting-button", digID, digID);

                  var dateStart,
                      dateEnd,
                      cccType,
                      cccCode;

                  it.dialog[digID] = $("#"+digID).kendoDialog({
                     width: "500px",
                     closable: false,
                     title: "CAMPAIGN SELECT",
                     content: content,
                     actions: [
                        {
                           text: "OK",
                           action: function( e ) {
                              var data = cccCode.value();

                              if ( data === "A" ) {
                                 alert("CCC-CODE Required!!");
                                 return false;
                              }

                              self._meEvent.doSetting({ "CCC_CODE": data }, domID);
                              return true;
                           },
                           primary: true
                        },
                        {
                           text: "Cancel"
                        }
                     ]
                  }).data("kendoDialog");

                  it.dialog["nx-date-start"] = it.dialog[digID].wrapper.find("#nx-date-start").kendoDatePicker({
                     value : new Date(),
                     format : "yyyy-MM-dd"
                  }).data("kendoDatePicker");
                  dateStart = it.dialog["nx-date-start"];

                  it.dialog["nx-date-end"] = it.dialog[digID].wrapper.find("#nx-date-end").kendoDatePicker({
                     value : new Date(),
                     format : "yyyy-MM-dd"
                  }).data("kendoDatePicker");
                  dateEnd = it.dialog["nx-date-end"];

                  /************************************************************************
                   * CSS - Permit
                   ************************************************************************/
                  var cccTypeData = [
                     { value: "C", text: "Campaign" },
                     { value: "H", text: "HappyCall" },
                     { value: "B", text: "Callback" }
                  ];

                  if ( self._permit !== undefined ) {
                     var none = self._permit["CAMPAIGN"];

                     if ( none !== undefined ) {
                        for ( var i=0; i<none.length; i++ ) {
                           var domID = none[i];
                           if ( domID === "NX-CALLBACK" ) {
                              cccTypeData = [
                                 { value: "C", text: "Campaign" },
                                 { value: "H", text: "HappyCall" }
                              ];
                           }
                        }
                     }
                  }
                  /************************************************************************
                   * CSS - Permit
                   ************************************************************************/

                  it.dialog["nx-type"] = it.dialog[digID].wrapper.find("#nx-type").kendoDropDownList({
                     dataSource: cccTypeData,
                     optionLabel: {
                        text: "SELECT",
                        value: "A"
                     },
                     dataTextField: "text",
                     dataValueField: "value",
                  }).data("kendoDropDownList");
                  cccType = it.dialog["nx-type"];

                  it.dialog["nx-code"] = it.dialog[digID].wrapper.find("#nx-code").kendoDropDownList({
                     optionLabel: {
                        text: "SELECT",
                        value: "A"
                     },
                     dataTextField: "text",
                     dataValueField: "value",
                  }).data("kendoDropDownList");
                  cccCode = it.dialog["nx-code"];

                  it.dialog[digID].wrapper.on("click", ".nx-search-button", function( e ) {
                     e.preventDefault();
                     var data = {
                        START_DATE: dateStart.value(),
                        END_DATE: dateEnd.value(),
                        CCC_TYPE: cccType.value()
                     };

                     self._meEvent.onSearch(data, it.handle);
                  });
               },
               requestData : function( data ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.SPREADSHEET" ) {
                        model.requestArgs("SELECT", {
                           "START_DATE": data.START_DATE,
                           "END_DATE"  : data.END_DATE,
                           "CCC_TYPE"  : data.CCC_TYPE
                        }, options);

                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              it.dialog["nx-code"].setDataSource(new kendo.data.DataSource({
                                 data: result
                              }));
                           }
                        });
                     }
                  }
               },
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerSettingViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerSetting] :: containerSettingViewModel : onContentLoad");
         var self = this;
         self._setTemplates.init();
      };

      _ptt._setObservable = function( position ) {
         var self = this;
         var defineBlock = self._DEFINE.getComponentChild(self._ROOT, position);
         return defineBlock;
      };

      _ptt._getText = function( path ) {
         var self = this;
         var arrPath = path.split("."),
             len = arrPath.length,
             result = _TEXT.CONTENTS[arrPath[0]];

         for ( var i=1; i<len; i++ ) {
            result = result[arrPath[i]];
         }

         return result;
      };

      _ptt._getHandleAfterBind = function( text, me ) {
         var self = this;
         var components = {};

         for ( var idx=0; idx<me.components.length; idx++ ) {
            var component = me.components[idx];

            var options = null,
                componentM,
                componentVM;

            var componentID = component.domID + "-" + self._postfix;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text, self._mydbms, self._shared, function( e ) {
                  self._setTemplates._viewCenter.customBind(componentID, self);
               });

               self._setEvent(component.TAG, options, components);
            }

            _binder.appendDIV(me.domID, componentID, component.domID);

            componentVM = _Components.onComponentLoad(component.TAG,
                                                      component.type,
                                                      componentID,
                                                      options);

            components[componentID] = {
               tag       : component.TAG,
               type      : component.type,
               option    : options,
               model     : componentM,
               viewModel : componentVM,
               text      : text
            };
         }

         return components;
      };

      _ptt._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
            onSearch: function( data, components ) {
               console.log("## ME ## ["+tag+"] onSearch : Dialog");
               var sdate = data.START_DATE,
                   yyyy = sdate.getFullYear(),
                   MM = sdate.getMonth(),
                   dd = sdate.getDate();

               data.START_DATE = new Date(yyyy, MM, dd, 0, 0, 0).getTime();
               data.END_DATE = data.END_DATE.getTime();

               self._setTemplates._viewCenter.requestData(data);
            },
            doSetting: function( data, domID ) {
               console.log("## ME ## ["+tag+"] doSetting : Dialog");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = vm.spreadsheet.sheetByIndex(0).toJSON().rows;
               var args = model.requestJdbcArgs("INSERT", data, values);

               model.requestJdbc("INSERT", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doSetting => "+JSON.stringify(error));
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doSetting => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     notify.doSuccess("Save Success", "Count: " + result[0]);
                  },
                  onResultParam : data
               });
            },
         };

         switch ( tag ) {
            case "SETTING_SHEET":
               options.onExcelImport = self._meEvent.onExcelImport;
               break;

            default: break;
         }
      };

      _ptt.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };


      return containerSettingViewModel;

   }
);