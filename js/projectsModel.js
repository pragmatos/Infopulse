(function(app){
    'use strict';

    function Model(projects){
        this.projects = projects;
    }

    Model.prototype.create = function(project){
        this.projects.push(project);    
    }

    app = app || {};
    app.ProjectsModel = Model;
})(window.app);