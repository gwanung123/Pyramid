'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerAssignViewModel( win ) {

         console.log("[containerAssign] :: containerAssignViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;

         this._mydbms = this._dbms[win.others.joinBind.dbms];
         this._shared = this._nexus.get("shared");

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerAssign] :: containerAssignViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_ASSIGN.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function() {
               var that = this;
               var html = "<table id=\"nx-assign-container\" style=\"height: 100%;\">" +
                              "<tbody>" +
                              "<tr>" +
                                 "<td rowspan=\"2\">" +
                                    "<div id=\"nx-assign-tree\" style=\"width: 250px; height: 100%;\"></div>" +
                                 "</td>" +
                                 "<td style=\"height: 135px; width: 100%;\">" +
                                    "<div id=\"nx-assign-top\"></div>" +
                                 "</td>" +
                              "</tr>" +
                              "<tr>" +
                                 "<td>" +
                                    "<div id=\"nx-assign-bottom\" style=\"height: 100%;\"></div>" +
                                 "</td>" +
                              "</tr>" +
                              "</tbody>" +
                          "</table>";

               _binder.appendHTML(self._domID, html);

               that._viewLeft.init("nx-assign-tree");
               that._viewTop.init("nx-assign-top");
               that._viewBottom.init("nx-assign-bottom");
            },
            _viewLeft : {
               handle : undefined,
               init : function( parentID ) {
                  var it = this;
                  var dbms = self._dbms[win.others.joinBind["viewLeft"].dbms],
                      text = self._getText(win.others.joinBind["viewLeft"].text),
                      title = win.others.joinBind["viewLeft"].title,
                      defineBlock = self._setObservable("viewLeft");
                  var html = "<h6 class=\"nx-containerAssign-title\">" + title + "</h6>",
                      me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(parentID, me.domID, me.css);
                  _binder.appendHTML(me.domID, html);

                  it.handle = self._getHandleAfterBind(dbms, text, me);
                  if ( it.handle === undefined ) return;

                  it.requestData();
               },
               requestData : function() {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     model.requestData(options, {
                        onResult : function( result, error, param ) {
                           if ( error !== null ) return;
                           if ( result.hasOwnProperty("result") ) return;
                           vm.setData(result, param);
                           it.checkBoxDisabled(true);
                        },
                        onResultParam : {}
                     });
                  }
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.TREEVIEW" ) {
                        component.viewModel.setPushData(action, service, id, data, bind);
                     }
                  }
               },
               checkBoxDisabled : function( value, items ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.TREEVIEW" ) {
                        component.viewModel.checkBoxDisabled(value, items);
                     }
                  }
               },
               checkBoxChecked : function( value, items ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.TREEVIEW" ) {
                        if ( items === undefined ) {
                           component.viewModel.checkBoxInit(value);
                        }
                        else {
                           component.viewModel.checkBoxChecked(value, items);
                        }
                     }
                  }
               },
               getComponent : function( tag ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];
                     if ( component.tag === tag ) return component;
                  }

                  return null;
               },
            },
            _viewTop : {
               handle : undefined,
               init : function( parentID ) {
                  var it = this;
                  var dbms = self._dbms[win.others.joinBind["viewTop"].dbms],
                      text = self._getText(win.others.joinBind["viewTop"].text),
                      defineBlock = self._setObservable("viewTop");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(parentID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(dbms, text, me);
                  if ( it.handle === undefined ) return;

                  it.customBind();
               },
               customBind : function() {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel;
                     var template = "<div class=\"nx-ccc-input\">" +
                                       "<label class=\"nx-ccc-title\">CCC-CODE : </label>" +
                                       "<input id=\"nx-assign-cccCode\" />" +
                                       "<a id=\"nx-search-button\" class=\"k-button nx-search-button\" href=\"\\#\">Search</a>" +
                                    "</div>";

                     if ( component.type === "KENDO.GRID" ) {
                        vm.setOptions({ toolbar: template });

                        var grid = vm.grid.wrapper;

                        var cccCode = grid.find("#nx-assign-cccCode").kendoDropDownList({
                           dataSource: model.makeCodeData("CCC_CODE"),
                           dataTextField: "text",
                           dataValueField: "value",
                        }).data("kendoDropDownList");

                        grid.find(".k-grid-toolbar").on("click", ".nx-search-button", function( e ) {
                           e.preventDefault();
                           var data = {
                              CCC_CODE: cccCode.value()
                           };

                           vm.setData([]);
                           self._meEvent.doSearch(data, domID, it.handle);
                        });
                     }
                  }
               },
               requestData : function( data, callback ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestArgs("DBMS_LIST", {
                           "CCC_CODE": data.CCC_CODE,
                        }, options);

                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData([]);
                              vm.setData(result, param);
                              if ( callback !== undefined ) callback(result[0]);
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
            },
            _viewBottom : {
               handle : undefined,
               init : function( parentID ) {
                  var it = this;
                  var dbms = self._dbms[win.others.joinBind["viewBottom"].dbms],
                      text = self._getText(win.others.joinBind["viewBottom"].text),
                      defineBlock = self._setObservable("viewBottom");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(parentID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(dbms, text, me);
                  if ( it.handle === undefined ) return;

                  it.customBind();
               },
               customBind : function() {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel;
                     var template = "<div class=\"nx-ccc-input\">" +
                                       "<label class=\"nx-ccc-title\">RANDOM ASSIGN : </label>" +
                                       "<input id=\"nx-random-routing\" />" +
                                       "<a id=\"nx-set-button\" class=\"k-button nx-set-button\" href=\"\\#\">Set</a>" +
                                    "</div>" +
                                    "<div class=\"nx-ccc-info\">" +
                                       "<label class=\"nx-ccc-title\">ASSIGNED : </label>" +
                                       "<span id=\"nx-sum-routed\"><b></b></span>" +
                                       "<label class=\"nx-ccc-title\"> | NOT ASSIGN : </label>" +
                                       "<span id=\"nx-not-routed\"><b></b></span>" +
                                       "<a id=\"nx-assign-button\" class=\"k-button nx-assign-button\" href=\"\\#\">Assign</a>" +
                                       "<a id=\"nx-retrieval-button\" class=\"k-button nx-retrieval-button\" href=\"\\#\">Retrieval</a>" +
                                    "</div>";

                     if ( component.type === "KENDO.GRID" ) {
                        vm.setOptions({ toolbar: template });

                        var grid = vm.grid.wrapper;

                        var random = grid.find("#nx-random-routing").kendoNumericTextBox({
                           format: "n0",
                           min: 0,
                           value: 0
                        }).data("kendoNumericTextBox");

                        $("#nx-sum-routed").text(0);
                        $("#nx-not-routed").text(0);

                        grid.find(".k-grid-toolbar").on("click", ".nx-set-button", function( e ) {
                           e.preventDefault();
                           var data = {
                              RANDOM_ASSIGN: random.value()
                           };

                           self._meEvent.doRandomAssign(data, domID, component);
                        });

                        grid.find(".k-grid-toolbar").on("click", ".nx-assign-button", function( e ) {
                           e.preventDefault();
                           var data = vm.getData("AS-IS");

                           self._meEvent.doAssign(data, domID, component);
                        });

                        grid.find(".k-grid-toolbar").on("click", ".nx-retrieval-button", function( e ) {
                           e.preventDefault();
                           var data = vm.getData("AS-IS");

                           self._meEvent.doRetrieval(data, domID, component);
                        });
                     }
                  }
               },
               requestData : function( data, topData ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestArgs("SELECT", {
                           "CCC_CODE"  : data.CCC_CODE,
                        }, options);

                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData([]);
                              vm.setData(result, param);
                              options.topData = topData;
                              self._setTemplates._viewLeft.checkBoxChecked(true, options.treeItems);
                              self._setTemplates._viewLeft.checkBoxDisabled(true, options.treeItems);
                              $("#nx-sum-routed").text(model.sumRouted(result));
                              $("#nx-not-routed").text(options.topData["NOTROUTED_COUNT"]);
                           }
                        });
                     }
                  }
               },
               checkedData : function( data ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        var asis = vm.getData(),
                            items = model.setItems(asis, data);
                        vm.setData();
                        vm.setData(items);
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
      var _ptt = containerAssignViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerAssign] :: containerAssignViewModel : onContentLoad");
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

      _ptt._getHandleAfterBind = function( dbms, text, me ) {
         var self = this;
         var components = {};

         for ( var idx=0; idx<me.components.length; idx++ ) {
            var component = me.components[idx];

            var options = null,
                componentM,
                componentVM;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text, dbms, self._shared);
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
            doSearch: function( data, domID, param ) {
               console.log("## ME ## ["+tag+"] doSearch : " + domID);
               self._setTemplates._viewLeft.checkBoxDisabled(false);
               self._setTemplates._viewLeft.checkBoxChecked(false);
               self._setTemplates._viewTop.requestData(data, function( res ) {
                  self._setTemplates._viewBottom.requestData(data, res);
               });
            },
            doRandomAssign: function( data, domID, param ) {
               console.log("## ME ## ["+tag+"] doRandomAssign : " + domID);
               var component = param,
                   vm = component.viewModel,
                   m = component.model,
                   options = component.option;
               var asis = vm.getData(),
                   input = data.RANDOM_ASSIGN,
                   notAssign = options.topData["NOTROUTED_COUNT"];

               if ( input > notAssign ) {
                  var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                  notify.doError("Validation Error", "", "Random Assign Value Error");
                  return;
               }

               for ( var i=0; i<asis.length; i++ ) {
                  var row = asis[i];

                  if ( notAssign <= input ) {
                     row["ROUTING_INPUT"] = notAssign;
                     notAssign = 0;
                     break;
                  }

                  row["ROUTING_INPUT"] = input;
                  notAssign -= input;
               }

               vm.setData(asis);
               $("#nx-not-routed").text(notAssign);
            },
            doAssign: function( asis, domID, param ) {
               console.log("## ME ## ["+tag+"] doAssign");
               var component = param,
                   vm = component.viewModel,
                   model = component.model,
                   options = component.option;
               var args = model.requestJdbcArgs("ASSIGN", asis, self._nexus);

               model.requestJdbc("ASSIGN", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doAssign => "+JSON.stringify(error));
                        notify.doError("Save Error", "", JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doAssign => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     self._meEvent.doSearch({
                        CCC_CODE: options.topData["CCC_CODE"]
                     }, domID, param);
                  },
                  onResultParam : asis
               });
            },
            doRetrieval: function( asis, domID, param ) {
               console.log("## ME ## ["+tag+"] doRetrieval");
               var component = param,
                   vm = component.viewModel,
                   model = component.model,
                   options = component.option;
               var args = model.requestJdbcArgs("RETRIEVAL", asis, self._nexus);

               model.requestJdbc("RETRIEVAL", args, {
                  onResult : function( result, error, param ) {
                     var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});

                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doRetrieval => "+JSON.stringify(error));
                        notify.doError("Save Error", "", JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! doRetrieval => "+JSON.stringify(result));
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }

                     self._meEvent.doSearch({
                        CCC_CODE: options.topData["CCC_CODE"]
                     }, domID, param);
                  },
                  onResultParam : asis
               });
            },
            onCheck : function( tag, checked, methods, domID ) {
               console.log("## ME ## ["+tag+"] onCheck : " + checked.length);
               var component = components[domID],
                   data = component.model.setItems(checked);
               self._setTemplates._viewBottom.checkedData(data);
            },
         };

         switch ( tag ) {
            case "ASSIGN_TREEVIEW":
               options.onCheck = self._meEvent.onCheck;
               break;

            case "ASSIGN_AGENT_GRID":
               options.onDataBound = self._meEvent.onDataBound;
               break;

            default: break;
         }
      };

      _ptt.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._setTemplates._viewCenter.setPushData(action, service, id, data, bind);
      };


      return containerAssignViewModel;

   }
);