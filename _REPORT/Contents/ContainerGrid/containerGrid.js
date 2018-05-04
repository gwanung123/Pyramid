'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerGridViewModel( win ) {

         console.log("[containerGrid] :: containerGridViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;
         this._mydbms = this._dbms.CONTAINER_GRID;

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerGrid] :: containerGridViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_GRID.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function( view ) {
               var that = this;

               that._viewTop.init();
               that._viewCenter.init();
               that._viewBottom.init();
            },
            _viewTop : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = _TEXT.CONTENTS.CONTAINER_GRID.TOP,
                      defineBlock = self._setObservable("viewTop");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;
               },
               setData : function( data, action ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel;

                     if ( model.setItems === undefined ) continue;

                     if ( component.type === "KENDO.MENU" ) {
                        switch ( action ) {
                           case "INSERT":
                              var append = model.addItems(data, component.text);
                              vm.doAppend(append);
                              break;

                           case "DELETE":
                              var domId = model.delItems(data, component.text);
                              vm.doRemove(domId);
                              break;

                           default:
                              model.setItems(data);
                              vm.setData(model.getItems());
                        }
                     }
                     else {
                        model.setItems(data);
                        vm.setData(model.getItems());
                     }
                  }
               }
            },
            _viewCenter : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = _TEXT.CONTENTS.CONTAINER_GRID.CENTER,
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
                     var template = "<div class=\"nx-day-search\">" +
                                    "<label class=\"nx-day-title\">BETWEEN : </label>" +
                                    "<input id=\"nx-day-start\" style=\"width: 150px\"/>" +
                                    " - " +
                                    "<input id=\"nx-day-end\" style=\"width: 150px\"/>" +
                                    "<a class=\"k-button nx-search-button\" href=\"\\#\">Search</a>" +
                                    "</div>" +
                                    "<a role=\"button\" class=\"k-button k-button-icontext k-grid-excel\" href=\"\\#\">" +
                                    "<span class=\"k-icon k-i-file-excel\"></span>Export to Excel</a>" +
                                    "<a role=\"button\" class=\"k-button k-button-icontext k-grid-pdf\" href=\"\\#\">" +
                                    "<span class=\"k-icon k-i-file-pdf\"></span>Export to PDF</a>";

                     if ( component.type === "KENDO.GRID" ) {
                        vm.setOptions({ toolbar: template });
                        var grid = vm.grid.wrapper;

                        var dateStart = grid.find("#nx-day-start").kendoDatePicker({
                               value : new Date(),
                               format : "yyyy-MM-dd"
                            }).data("kendoDatePicker");

                        var dateEnd = grid.find("#nx-day-end").kendoDatePicker({
                               value : new Date(),
                               format : "yyyy-MM-dd"
                            }).data("kendoDatePicker");

                        grid.find(".k-grid-toolbar").on("click", ".nx-search-button", function( e ) {
                           e.preventDefault();
                           vm.setData([]);
                           self._meEvent.onSearch(dateStart.value(), dateEnd.value(), vm.domID, it.handle);
                        });
                     }
                  }
               },
               setData : function( data ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( model.setItems === undefined ) continue;

                     if ( component.type === "KENDO.GRID" ) {
                        model.setItems(data, options);
                     }
                     else {
                        model.setItems(data);
                        vm.setData(model.getItems());
                     }
                  }
               },
               requestData : function( startDay, endDay ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestArgs("SELECT", {
                           "DAY_START": startDay,
                           "DAY_END": endDay
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
               }
            },
            _viewBottom : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = _TEXT.CONTENTS.CONTAINER_GRID.BOTTOM,
                      defineBlock = self._setObservable("viewBottom");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;
               },
               setData : function( data ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel;

                     if ( component.type === "KENDO.BARCHART" ) {
                        component.viewModel.setData(data);
                     }
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerGridViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerGrid] :: containerGridViewModel : onContentLoad");
         var self = this;
         self._setTemplates.init();
      };

      _ptt._setObservable = function( position ) {
         var self = this;
         var defineBlock = self._DEFINE.getComponentChild(self._ROOT, position);
         return defineBlock;
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
               options = componentM.getOptions(text[component.TAG], self._mydbms, self._myTag);
               self._setEvent(component.TAG, options, components);
            }

            var componentID = component.domID + "-" + self._postfix;

            if ( component.type === "KENDO.MENU" ) {
               _binder.appendHTML(me.domID, "<ul id=\"" + componentID + "\" class=\"" + component.domID + "\"></ul>");
            }
            else {
               _binder.appendDIV(me.domID, componentID, component.domID);
            }

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
               text      : text[component.TAG]
            };
         }

         return components;
      };

      _ptt._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
            onSearch: function( start, end, domID, components ) {
               console.log("## ME ## ["+tag+"] onSearch : " + domID);
               var startDay = kendo.toString(start, "yyyyMMdd"),
                   endDay = kendo.toString(end, "yyyyMMdd");

               self._setTemplates._viewCenter.requestData(startDay, endDay);
            },
            setData: function( tag, data, methods, domID ) {
               console.log("## ME ## ["+tag+"] setData : " + domID);
               self._setTemplates._viewBottom.setData(data);
            }
         };

         switch ( tag ) {
            case "SELECTED_GRID":
               options.setData = self._meEvent.setData;
               break;

            default: break;
         }
      };

      _ptt._setJoinData = function( data, tag ) {
         var self = this;

         setTimeout( function() {
            self._setTemplates._viewTop.setData(data, tag);
            self._setTemplates._viewCenter.setData(data, tag);
         }, 100 );
      };


      return containerGridViewModel;

   }
);