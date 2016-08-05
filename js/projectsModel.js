(function(window){
    'use strict';

    function Model(projects){
        this.projects = projects;
    }

    Model.prototype.create = function(project){
        this.projects.push(project);    
    }

    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);