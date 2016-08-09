(function(window){
    'use strict';

    function Model(repository){
        this.storage = repository;
    }

    Model.prototype.create = function(project, callback){
        this.storage.save(project, callback);
    }
    Model.prototype.isValid = function(project, callback){
        console.log(project);
        for(var key in project){
           console.log("key: "+ key, "Value: "+ project[key]);
        }
        callback(null);
    }

    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);