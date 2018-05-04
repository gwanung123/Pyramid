'use strict';

define([
      "Contents/contents",
      "Contents/contents.templates",
      "Contents/contents.templates.model",
      "Containers/model/modelLoading"
   ],
   function( contents, templates, modelTemplates, modelLoading ) {

      /***********************************************************
       * name        : Define
       * url         : root/report.define
       * description : contents 설정
       ************************************************************/

      /* contents 경로 */
      var _base_path = "/_REPORT/Contents/";

      /**
       * contents list
       * # TAG를 _define에 찾음 ( TAG = _define의 key )
       * # LOCATION이 지정된 content는 window(kendoUI)로 띄워짐
       * # LOCATION이 없는 content는 설정에 따라 컴포넌트에 append 되어짐
       *   (ex) tab
       */
      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_GRID     : { TAG : "containerGrid" },//트리에서 눌렀을때
         CONTAINER_GRID_ALL : { TAG : "containerGridAll" },
         CONTAINER_GRID_ALL_TRACE : { TAG : "containerGridAllForCallTrace" },
         AGENT              : { TAG : "agent" },
         STATE              : { TAG : "state" },
         QUEUE              : { TAG : "queue" },
         SKILL              : { TAG : "skill" },
         IVR                : { TAG : "ivr" },
         TRACE              : { TAG : "trace" }
      };

      /**
       * contents setting
       * # content의 구성을 setting 함
       * # view: 화면의 html, viewModel: 데이터 binding 및 loading
       * # window: content 영역을 의미
       *   - 고정영역: viewTop, viewBottom, viewLeft, viewRight, viewCenter
       *   - nxBlock에 정보 저장되어 공유됨
       *     (reference) /Library/report.block
       * # components/componentTmpls
       *   - TAG: Unique 해야함
       *   - type: components 종류 (reference) /Components/components.js
       *   - domID: component가 append될 div ID로 Unique 해야함
       *   - model: component의 설정 및 데이터 정의
       *   - push: websocket을 통해 받을 서비스
       *   - join: 다른 영역 component의 이벤트 및 데이터를 공유할고자할 경우
       * # dbms: db 쿼리 설정 (reference) /Defines/dbms/
       * # text: 화면 text 및 component 설정 (reference) /Defines/text/
       */
      var _define = {
         /**
          * contents와 상관없이 필요한 데이터를 읽어올 때 사용
          * (execute) report.router
          */
         "loading" : [
         ],

         /**
          * treeview
          * - window(kendoUI)
          */
         "resource" : {
               parent   : "nx-contents",
               title    : "RESOURCE",
               content  : _base_path + _menu.RESOURCE.LOCATION,
               view     : contents.contentsVs.resource,
               viewModel: contents.contentsVMs.resource,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "TREEVIEW_AGENT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewAgent",
                                 model : modelTemplates.modelResourceLeft_agent,
                                 push  : ["master"]
                              },
                              {
                                 TAG   : "TREEVIEW_QUEUE",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewQueue",
                                 model : modelTemplates.modelResourceLeft_queue,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_SKILL",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewSkill",
                                 model : modelTemplates.modelResourceLeft_skill,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                           ],
                           parent: "nx-contents-resource-left",
                           view  : templates.templatesVs.viewResourceLeft,
                           viewModel : templates.templatesVMs.viewResourceLeft
                     }
               }
         },

         /**
          * tabstrip
          * - window(kendoUI)
          */
         "container" : {
               parent   : "nx-contents",
               title    : "CONTAINER",
               windowID : "nx-contents-div-" + _menu.CONTAINER.TAG,
               content  : _base_path + _menu.CONTAINER.LOCATION,
               view     : contents.contentsVs.container,
               viewModel: contents.contentsVMs.container,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "TABSTRIP",
                                 type  : "KENDO.TABSTRIP",
                                 domID : "nxContainer",
                                 model : modelTemplates.modelContainerCenter,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT",
                                          "resource.viewLeft.TREEVIEW_QUEUE",
                                          "resource.viewLeft.TREEVIEW_SKILL"],
                                 /**
                                  * resource(treeview)의 check box가 check 되어지면
                                  * containerGrid 화면이 container(tabstrip)에 append 됨
                                  */
                                 joinBind : {
                                    TREEVIEW_AGENT  : {
                                       TAG     : "AGENT_GRID",
                                       domID   : "nxContainerGridAgent",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_QUEUE : {
                                       TAG     : "QUEUE_GRID",
                                       domID   : "nxContainerGridQueue",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_SKILL: {
                                       TAG     : "SKILL_GRID",
                                       domID   : "nxContainerGridSkill",
                                       content : "containerGrid"
                                    }
                                 }
                              }
                           ],
                           parent: "nx-contents-container-center",
                           view  : templates.templatesVs.viewContainerCenter,
                           viewModel : templates.templatesVMs.viewContainerCenter
                     }
               }
         },

         /**
          * container(tabstrip) 에 append
          * - resource(treeview)의 check box를 check할 경우
          */
         "containerGrid" : {
               css      : "nx-containerGrid",
               viewModel: contents.contentsVMs.containerGrid,
               window   : {
                     "viewTop" : {
                           components : [
                              {
                                 TAG   : "MENU_LIST",
                                 type  : "KENDO.MENU",
                                 domID : "nxContainerGridTop",
                                 model : modelTemplates.modelContainerGridTop
                              }
                           ],
                           css: "nx-containerGrid-top"
                     },
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SELECTED_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridCenter",
                                 model : modelTemplates.modelContainerGridCenter
                              }
                           ],
                           css: "nx-containerGrid-center"
                     },
                     "viewBottom" : {
                           components : [
                              {
                                 TAG   : "BARCHART",
                                 type  : "KENDO.BARCHART",
                                 domID : "nxContainerGridBottom",
                                 model : modelTemplates.modelContainerGridBottom
                              }
                           ],
                           css: "nx-containerGrid-bottom"
                     }
               }
         },

         /**
          * container(tabstrip) 에 append
          * - sidebar의 메뉴가 클릭되어질 경우
          */
         "containerGridAll" : {
               css      : "nx-containerGridAll",
               viewModel: contents.contentsVMs.containerGridAll,
               window   : {
                     "viewTop" : {
                           components : [
                              {
                                 TAG   : "ALL_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridAllTop",
                                 model : modelTemplates.modelContainerGridAllTop
                              }
                           ],
                           css: "nx-containerGridAll-top"
                     },
                     "viewBottom" : {
                           components : [
                              {
                                 TAG   : "ALL_BARCHART",
                                 type  : "KENDO.BARCHART",
                                 domID : "nxContainerGridAllBottom",
                                 model : modelTemplates.modelContainerGridAllBottom
                              }
                           ],
                           css: "nx-containerGridAll-bottom"
                     }
               }
         },
         "containerGridAllForCallTrace" : {
            css      : "nx-containerGridAllForCallTrace",
            viewModel: contents.contentsVMs.containerGridAllForCallTrace,
            window   : {
                  "viewTop" : {
                        components : [
                           {
                              TAG   : "ALL_GRID_TRACE_TOP",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridAllTopForCallTrace",
                              model : modelTemplates.modelContainerGridAllTopForCallTrace
                           }
                        ],
                        css: "nx-containerGridAllForCallTrace-top"
                  },
                  "viewBottom" : {
                        components : [
                           {
                              TAG   : "ALL_GRID_TRACE_BOTTOM",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridAllBottomForCallTrace",
                              model : modelTemplates.modelContainerGridAllBottomForCallTrace
                           }
                        ],
                        css: "nx-containerGridAllForCallTrace-bottom"
                  }
            }
      },
         /**
          * sidebar 메뉴
          * - 상담원 통계
          */
         "agent" : {
               parent   : "container",
               title    : "AGENT STATS",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "STATS_GRID_ALL",
                           domID   : "nxContainerGridAll_AS",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : {
                              viewTop: "CONTAINER_GRID.CENTER.SELECTED_GRID.AGENT_GRID",
                              viewBottom: "CONTAINER_GRID.BOTTOM.BARCHART.AGENT_GRID"
                           }
                     }
               }
         },

         /**
          * sidebar 메뉴
          * - 상담원 실적 통계
          */
         "state" : {
               parent   : "container",
               title    : "AGENT STATE",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "AGENT_GRID_ALL",
                           domID   : "nxContainerGridAll_AE",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID_ALL",
                           text    : {
                              viewTop: "CONTAINER_GRID_ALL.TOP.ALL_GRID.AGENT_STATE",
                              viewBottom: "CONTAINER_GRID_ALL.BOTTOM.ALL_BARCHART.AGENT_STATE"
                           }
                     }
               }
         },

         /**
          * sidebar 메뉴
          * - 큐 통계
          */
         "queue" : {
               parent   : "container",
               title    : "QUEUE",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "QUEUE_GRID_ALL",
                           domID   : "nxContainerGridAll_R",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : {
                              viewTop: "CONTAINER_GRID.CENTER.SELECTED_GRID.QUEUE_GRID",
                              viewBottom: "CONTAINER_GRID.BOTTOM.BARCHART.QUEUE_GRID"
                           }
                     }
               }
         },

         /**
          * sidebar 메뉴
          * - 스킬 통계
          */
         "skill" : {
               parent   : "container",
               title    : "SKILL",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "SKILL_GRID_ALL",
                           domID   : "nxContainerGridAll_S",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : {
                              viewTop: "CONTAINER_GRID.CENTER.SELECTED_GRID.SKILL_GRID",
                              viewBottom: "CONTAINER_GRID.BOTTOM.BARCHART.SKILL_GRID"
                           }
                     }
               }
         },
         //20180404_Sam
         "ivr" : {
            parent   : "container",
            title    : "IVR",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "IVR_GRID_ALL",
                        domID   : "nxContainerGridAll_IVR",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID",
                        text    : {
                           viewTop: "CONTAINER_GRID.CENTER.SELECTED_GRID.IVR_GRID",
                           viewBottom: "CONTAINER_GRID.BOTTOM.BARCHART.IVR_GRID"
                        }
                  }
            }
      },
      "trace" : {
            parent   : "container",
            title    : "TRACE",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "TRACE_GRID_ALL",
                        domID   : "nxContainerGridAll_TRACE",
                        content : "containerGridAllForCallTrace",
                        dbms    : "CONTAINER_GRID",
                        text    : {
                           viewTop: "CONTAINER_GRID.CENTER.SELECTED_GRID.TRACE_GRID_TOP",
                           viewBottom: "CONTAINER_GRID.CENTER.SELECTED_GRID.TRACE_GRID_BOTTOM"
                        }
                  }
            }
      },
      }; // end of _define


      /************************************************************
       *
       ************************************************************/
      var method = {
         MENU : _menu,
         getComponent : function( rootComponent, propName ) {
            if ( rootComponent === undefined ) return _define;
            if ( _define[rootComponent] === undefined ) return null;
            if ( propName === undefined ) return _define[rootComponent];
            return _define[rootComponent][propName];
         },
         getComponentView : function( rootComponent ) {
            return _define[rootComponent]["view"];
         },
         getComponentChild : function( rootComponent, tag ) {
            return _define[rootComponent]["window"][tag];
         }
      };


      return method;
   }
);


