(function(window){
    'use strict';

    function Model(repository){
        this.storage = repository;
    }

    Model.prototype.create = function(project, callback){
        this.storage.save(project, callback);
    }

    window.app = window.app || {};
    window.app.ProjectsModel = Model;
})(window);