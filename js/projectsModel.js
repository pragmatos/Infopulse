(function(window){
    'use strict';

    function Model(repository){
        this.storage = repository;
        this.today = new Date().getTime();
    }

    Model.prototype.create = function(project, callback){
        this.storage.save(project, callback);
    }
    Model.prototype.delete = function(id, callback){
        this.storage.remove(id, callback);
    }
    Model.prototype.isActive = function(project){
        return new Date(project.dueDate).getTime() > this.today;
    }
    Model.prototype.getTimeStamp = function(date){

    }

    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);