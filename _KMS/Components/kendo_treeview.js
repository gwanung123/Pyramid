'use strict';

define(["./models/kendo_treeview", "kendo.all.min"],
   function( model ) {

      function TreeView( domID, options ) {
         console.log("[treeview] :: TreeView : load");
         var self = this;

         if ( options === null ) {
            console.log("[treeview] :: error > options is null");
            return null;
         }

         //treeview set and start
         self.location = $("#" + domID);
         self.location.empty();

         //kendoTreeView parameter
         self.param = model(options);

         if ( self.param === null ) {
            console.log("[treeview] :: error > invalid options");
            return null;
         }

         self.treeview = self.location.kendoTreeView(self.param).data("kendoTreeView");

         return self;
      };

      TreeView.prototype.empty = function() {
         console.log("[treeview] :: TreeView : empty");
         var self = this;

         self.setDataSource([]);
         return self;
      };

      TreeView.prototype.destroy = function() {
         var self = this;
         self.treeview.destroy();
      };

      TreeView.prototype.setDataSource = function( data ) {
         var self = this;
         var dataSource = new kendo.data.HierarchicalDataSource({
           data: data
         });
         self.treeview.setDataSource(dataSource);
      };

      TreeView.prototype.getItem = function( id ) {
         var self = this;
         return self.treeview.dataSource.get(id);
      };

      TreeView.prototype.findByUid = function( uid ) {
         var self = this;
         return self.treeview.findByUid(uid);
      };

      TreeView.prototype.findByText = function( txt ) {
         var self = this;
         return self.treeview.findByText(txt);
      };

      TreeView.prototype.text = function( e ) {
         var self = this;
         return self.treeview.text(e);
      };


      return TreeView;
   }
);