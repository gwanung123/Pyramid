'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerGridAllViewModel( win ) {

         console.log("[containerGridAll] :: containerGridAllViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");
         this._mydbms = this._dbms[win.others.joinBind.dbms];

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerGridAll] :: containerGridAllViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_GRID_ALL.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function() {
               var that = this;

               that._viewTop.init();
               that._viewBottom.init();
            },
            _viewTop : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = self._getText(win.others.joinBind.text["viewTop"]),
                      defineBlock = self._setObservable("viewTop");
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
               requestData : function( startDay, endDay ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestArgs("SELECT_ALL", {
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
                  var text = self._getText(win.others.joinBind.text["viewBottom"]),
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
      var _ptt = containerGridAllViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerGridAll] :: containerGridAllViewModel : onContentLoad");
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
               options = componentM.getOptions(text, self._mydbms);
               self._setEvent(component.TAG, options);
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

      _ptt._setEvent = function( tag, options ) {
         var self = this;

         self._meEvent = {
            onSearch: function( start, end, domID, components ) {
               console.log("## ME ## ["+tag+"] onSearch : " + domID);
               var startDay = kendo.toString(start, "yyyyMMdd"),
                   endDay = kendo.toString(end, "yyyyMMdd");

               self._setTemplates._viewTop.requestData(startDay, endDay);
            },
            setData: function( tag, data, methods, domID ) {
               console.log("## ME ## ["+tag+"] setData : " + domID);
               self._setTemplates._viewBottom.setData(data);
            }
         };

         switch ( tag ) {
            case "ALL_GRID":
               options.setData = self._meEvent.setData;
               break;

            default: break;
         }
      };


      return containerGridAllViewModel;

   }
);