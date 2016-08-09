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
    Model.prototype.getTypes = function(callback){
        this.storage.getBy('types', callback);
    }
    Model.prototype.getCustomers = function(callback){
        this.storage.getBy('customers', callback);
    }
    Model.prototype.getProjects = function(callback){
        this.storage.getBy('projects', callback);
    }

    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);