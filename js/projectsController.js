(function(window){
    'use strict';

    function Controller (model, view){
        var that = this;
        that.model = model;
        that.view = view;

        that.view.bind('newProject', function(project){
            that.addProject(project);
        });
    }
    Controller.prototype.addProject = function(project){
        var that = this;
        that.model.create(project, function(){
            console.log("saved");
        });
    }

    window.app = window.app || {};
    window.app.ProjectsController = Controller;
})(window);