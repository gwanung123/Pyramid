'use strict';

define([
      "nxbinder",
      "../../../Models/models.permit",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _PERMIT, _TEXT, _Components ) {

      function containerCampaignViewModel( win ) {

         console.log("[containerCampaign] :: containerCampaignViewModel : load");
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
            console.log("[containerCampaign] :: containerCampaignViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_CAMPAIGN.TAG;

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

                  it.customBind();
               },
               customBind : function() {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         vm = component.viewModel;
                     var template = "<div class=\"nx-ccc-input1\">" +
                                    "<label class=\"nx-ccc-title\">BETWEEN : </label>" +
                                    "<input id=\"nx-date-start\" style=\"width: 125px\"/>" +
                                    " - " +
                                    "<input id=\"nx-date-end\" style=\"width: 125px\"/>" +
                                    "<label class=\"nx-ccc-title\">TYPE : </label>" +
                                    "<input id=\"nx-type\" />" +
                                    "</div>" +
                                    "<div class=\"nx-ccc-input2 nx-ccc-search-button\">" +
                                    "<label class=\"nx-ccc-title\">CAMPAIGN NAME : </label>" +
                                    "<input id=\"nx-name\" />" +
                                    "<label class=\"nx-ccc-title\">CAMPAIGN STATUS : </label>" +
                                    "<a id=\"nx-search-button\" class=\"k-button nx-search-button\" href=\"\\#\">Search</a>" +
                                    "<input id=\"nx-status\" />" +
                                    "</div>" +
                                    "<a role=\"button\" class=\"nx-excel-button k-button k-button-icontext k-grid-excel\" href=\"\\#\">" +
                                    "<span class=\"k-icon k-i-file-excel\"></span>Export to Excel</a>" +
                                    "<a id=\"nx-create-button\" class=\"k-button nx-create-button\" href=\"\\#\">" +
                                    "<span class=\"k-icon k-i-plus\"></span>Create</a>";

                     if ( component.type === "KENDO.GRID" ) {
                        vm.setOptions({ toolbar: template });

                        var grid = vm.grid.wrapper;

                        var dateStart = grid.find("#nx-date-start").kendoDatePicker({
                               value : new Date(),
                               format : "yyyy-MM-dd"
                            }).data("kendoDatePicker");

                        var dateEnd = grid.find("#nx-date-end").kendoDatePicker({
                               value : new Date(),
                               format : "yyyy-MM-dd"
                            }).data("kendoDatePicker");

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

                        var cccType = grid.find("#nx-type").kendoDropDownList({
                               dataSource: cccTypeData,
                               optionLabel: {
                                  text: "ALL",
                                  value: "A"
                               },
                               dataTextField: "text",
                               dataValueField: "value",
                            }).data("kendoDropDownList");

                        var cccStatus = grid.find("#nx-status").kendoDropDownList({
                               dataSource: [
                                  { value: "0", text: "Ready" },
                                  { value: "1", text: "Play" },
                                  { value: "2", text: "Pause" },
                                  { value: "3", text: "Finish" }
                               ],
                               optionLabel: {
                                  text: "ALL",
                                  value: "A"
                               },
                               dataTextField: "text",
                               dataValueField: "value",
                            }).data("kendoDropDownList");

                        grid.find(".k-grid-toolbar").on("click", ".nx-search-button", function( e ) {
                           e.preventDefault();
                           var data = {
                              START_DATE: dateStart.value(),
                              END_DATE: dateEnd.value(),
                              CCC_TYPE: cccType.value(),
                              CCC_NAME: $("#nx-name").val(),
                              STATUS: cccStatus.value()
                           };

                           vm.setData([]);
                           self._meEvent.onSearch(data, domID, it.handle);
                        });

                        grid.find(".k-grid-toolbar").on("click", ".nx-create-button", function( e ) {
                           e.preventDefault();
                           it.loadDialog(component, domID);
                        });
                     }
                  }
               },
               loadDialog : function( component, domID ) {
                  var it = this;
                  var model = component.model,
                      text = component.text,
                      digID = "nx-campaign-dialog",
                      btnDom = $("#" + self._domID + " #nx-create-button"),
                      content = "<div class=\"nx-ccc-create-input\">" +
                                   "<label class=\"nx-ccc-title\">TENANT ID : </label>" +
                                   "<input id=\"nx-create-tenant\" />" +
                                   "<label class=\"nx-ccc-title\">CCC-TYPE : </label>" +
                                   "<input id=\"nx-create-type\" />" +
                                "</div>" +
                                "<p class=\"nx-separator\"></p>" +
                                "<div class=\"nx-ccc-create-input\">" +
                                   "<label class=\"nx-ccc-title\">CCC-CODE : </label>" +
                                   "<input id=\"nx-create-code\" />" +
                                   "<label class=\"nx-ccc-title\">CCC-NAME : </label>" +
                                   "<input id=\"nx-create-name\" />" +
                                "</div>" +
                                "<div class=\"nx-ccc-create-input\">" +
                                   "<label class=\"nx-ccc-title\">BETWEEN : </label>" +
                                   "<input id=\"nx-create-date-start\" style=\"width: 125px\" />" +
                                   " - " +
                                   "<input id=\"nx-create-date-end\" style=\"width: 125px\" />" +
                                "</div>" +
                                "<div class=\"nx-ccc-create-input\">" +
                                   "<label class=\"nx-ccc-title\">DESCRIPTION</label>" +
                                   "<textarea id=\"nx-create-memo\" rows=\"10\" cols=\"100\" />" +
                                "</div>";

                  var itemDom = btnDom.children("#" + digID);
                  if ( itemDom.length > 0 ) {
                     it.dialog[digID].destroy();
                     itemDom.remove();
                  }

                  _binder.appendDIV("nx-create-button", digID, digID);

                  var tenant,
                      cccType,
                      dateStart,
                      dateEnd;

                  it.dialog[digID] = $("#"+digID).kendoDialog({
                     width: "660px",
                     closable: false,
                     title: "CAMPAIGN CREATE",
                     content: content,
                     actions: [
                        {
                           text: "OK",
                           action: function( e ) {
                              var dig = e.sender.wrapper;
                              var ccc_code = dig.find("#nx-create-code").val(),
                                  ccc_name = dig.find("#nx-create-name").val(),
                                  ccc_memo = dig.find("#nx-create-memo").val();

                              if ( ccc_code === undefined || ccc_code.length === 0 ) {
                                 alert("CCC-CODE Required!!");
                                 return false;
                              }

                              self._meEvent.onInsert({
                                 "TENANT_ID" : tenant.value(),
                                 "CCC_TYPE"  : cccType.value(),
                                 "CCC_CODE"  : ccc_code,
                                 "CCC_NAME"  : ccc_name,
                                 "START_DATE": dateStart.value(),
                                 "END_DATE"  : dateEnd.value(),
                                 "STATUS"    : "0",
                                 "MEMO"      : ccc_memo,
                                 "REG_DATE"  : kendo.toString(new Date(), "yyyy-MM-dd"),
                                 "REG_ID"    : "%.nexus.userId",
                                 "MOD_DATE"  : kendo.toString(new Date(), "yyyy-MM-dd"),
                                 "MOD_ID"    : "%.nexus.userId"
                              }, domID);
                              return true;
                           },
                           primary: true
                        },
                        {
                           text: "Cancel"
                        }
                     ]
                  }).data("kendoDialog");

                  it.dialog["nx-create-tenant"] = it.dialog[digID].wrapper.find("#nx-create-tenant").kendoDropDownList({
                     dataSource: model.makeTenantData("TENANT_ID", text),
                     dataTextField: "text",
                     dataValueField: "value",
                  }).data("kendoDropDownList");
                  tenant = it.dialog["nx-create-tenant"];

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

                  it.dialog["nx-create-type"] = it.dialog[digID].wrapper.find("#nx-create-type").kendoDropDownList({
                     dataSource: cccTypeData,
                     dataTextField: "text",
                     dataValueField: "value",
                  }).data("kendoDropDownList");
                  cccType = it.dialog["nx-create-type"];

                  it.dialog["nx-create-date-start"] = it.dialog[digID].wrapper.find("#nx-create-date-start").kendoDatePicker({
                     value : new Date(),
                     format : "yyyy-MM-dd"
                  }).data("kendoDatePicker");
                  dateStart = it.dialog["nx-create-date-start"];

                  it.dialog["nx-create-date-end"] = it.dialog[digID].wrapper.find("#nx-create-date-end").kendoDatePicker({
                     value : new Date(),
                     format : "yyyy-MM-dd"
                  }).data("kendoDatePicker");
                  dateEnd = it.dialog["nx-create-date-end"];
               },
               requestData : function( data ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestArgs("SELECT", {
                           "START_DATE": data.START_DATE,
                           "END_DATE"  : data.END_DATE,
                           "CCC_TYPE"  : data.CCC_TYPE,
                           "CCC_NAME"  : data.CCC_NAME,
                           "STATUS"    : data.STATUS
                        }, options);

                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData(result, param);
                           }
                        });
                     }
                  }
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.GRID" ) {
                        var push = component.text.PUSH;

                        if ( push !== service ) return;

                        component.viewModel.setPushData(action, service, id, data, bind);
                     }
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerCampaignViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerCampaign] :: containerCampaignViewModel : onContentLoad");
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

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text, self._mydbms, self._shared);
               self._setEvent(component.TAG, options, components);
            }

            var componentID = component.domID + "-" + self._postfix;
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
            onSearch: function( data, domID, components ) {
               console.log("## ME ## ["+tag+"] onSearch : " + domID);
               var sdate = data.START_DATE,
                   yyyy = sdate.getFullYear(),
                   MM = sdate.getMonth(),
                   dd = sdate.getDate();

               data.START_DATE = new Date(yyyy, MM, dd, 0, 0, 0).getTime();
               data.END_DATE = data.END_DATE.getTime();

               self._setTemplates._viewCenter.requestData(data);
            },
            onEdit: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onEdit");

               e.sender.expandRow(e.container);

               var detailRow = e.container.next('.k-detail-row');
               detailRow.find('#nx-campaign-desc').toggle();
               detailRow.find('#nx-campaign-editor').toggle();

               var model = e.model;
               kendo.bind(detailRow, model);
               model.bind('change', function( e ) {
                  var tr = $('tr[data-uid=' + model.uid + ']');
               });
            },
            onSave: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onSave");
               var detailRow = e.container.next('.k-detail-row');
               detailRow.find('#nx-campaign-desc').toggle();
               detailRow.find('#nx-campaign-editor').toggle();
            },
            onCancel: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onCancel");
               var detailRow = e.container.next('.k-detail-row');
               detailRow.find('#nx-campaign-desc').toggle();
               detailRow.find('#nx-campaign-editor').toggle();
            },
            onInsert: function( values, domID ) {
               console.log("## ME ## ["+tag+"] onInsert");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model;
               var args = model.requestJdbcArgs("INSERT", values, self._nexus);

               model.requestJdbc("INSERT", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onInsert => "+JSON.stringify(error));
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onInsert => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     var data = model.getDataForObj(model.options, param);
                     vm.setData(data);
                  },
                  onResultParam : values
               });
            },
            onUpdate: function( tag, e, oldData, methods, domID ) {
               console.log("## ME ## ["+tag+"] onUpdate");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;

               values["MOD_DATE"] = kendo.toString(new Date(), "yyyy-MM-dd");
               values["MOD_ID"] = "%.nexus.userId";

               var args = model.requestJdbcArgs("UPDATE", values, self._nexus);

               model.requestJdbc("UPDATE", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onUpdate => "+JSON.stringify(error));
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onUpdate => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     var data = model.getDataForObj(model.options, param);
                     vm.setData(data);
                  },
                  onResultParam : values
               });
            },
            onDelete: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onDelete");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args = model.requestJdbcArgs("DELETE", values, self._nexus);

               model.requestJdbc("DELETE", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onDelete => "+JSON.stringify(error));
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onDelete => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     var data = model.getDataForObj(model.options, param);
                     vm.setDataDelete(data);
                  },
                  onResultParam : values
               });
            }
         };

         switch ( tag ) {
            case "CAMPAIGN_GRID":
               options.onEdit = self._meEvent.onEdit;
               options.onSave = self._meEvent.onSave;
               options.onCancel = self._meEvent.onCancel;

               options.onInsert = self._meEvent.onInsert;
               options.onUpdate = self._meEvent.onUpdate;
               options.onDelete = self._meEvent.onDelete;
               break;

            default: break;
         }
      };

      _ptt.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._setTemplates._viewCenter.setPushData(action, service, id, data, bind);
      };


      return containerCampaignViewModel;

   }
);