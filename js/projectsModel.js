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
    Model.prototype.getNormalDate = function (inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
    }
    Model.prototype.convertDate = function (dateString) {
        var dateParts = dateString.split("-");
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getTime();
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
    Model.prototype.getCurrentDate = function(){
        return this.getNormalDate(this.today);
    }
    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);