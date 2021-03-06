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
        that.view.bind('filterProjects', function(params){
            that.filterProjects(params);
        });
    }
    Controller.prototype.addProject = function(project){
        var that = this;
        that.model.create(project, function(newProject){
            that.view.render('addNewProject', newProject);
        });
    };
    Controller.prototype.removeProject = function(id){
        var that = this;
        this.model.delete(id, function(){
            that.view.render('removeProject', id);
        });
    };
    Controller.prototype.sortProjects = function(paramSort){
        this.view.render('sortProject', paramSort);
    };
    Controller.prototype.filterProjects = function(params){
        this.model.filterBy(params, function(projects){
            this.view.render('printAllProjects', projects);
        }.bind(this));
    };
    Controller.prototype.printAllProjects = function(){
        var that = this;
        that.model.getProjects(function(projects){
            that.view.render('printAllProjects', projects);
        });
    };

    window.app = window.app || {};
    window.app.ProjectsController = Controller;
})(window);