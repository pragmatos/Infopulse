(function(window){
    'use strict';

    function Controller (model, view){
        var that = this;
        that.model = model;
        that.view = view;

        that.view.bind('newProject', function(project){
            that.addProject(project);
        });
        that.view.bind('deleteProject', function(id){
            that.removeProject(id);
        });
        that.view.bind('sortProjects', function(project){
            that.sortProjects(project);
        });
    }
    Controller.prototype.addProject = function(project){
        var that = this;
        that.model.create(project, function(newProject){
            that.view.render('addNewProject', newProject);
        });
    }
    Controller.prototype.removeProject = function(id){
        var that = this;
        this.model.delete(id, function(){
            that.view.render('removeProject', id);
        });
    }
    Controller.prototype.sortProjects = function(paramSort){
        var that = this;
            //that.view.render('removeProject', id);
    }
    Controller.prototype.printAllProjects = function(){
        var that = this;
        that.model.getProjects(function(projects){
            that.view.render('printAllProjects', projects);
        });
    }

    window.app = window.app || {};
    window.app.ProjectsController = Controller;
})(window);