(function(window){
	"use strict";
	function Repository(name){
		this._name = name;

        if(!localStorage[this._name]){
            localStorage[this._name] = JSON.stringify([]);
        }
	}
    Repository.prototype.init = function(data, callback){
        if(data){
            localStorage[this._name] = data;
        }
        callback();
    }
    Repository.prototype.getBy = function(prop, callback){
        var data = JSON.parse(localStorage[this._name]);

        callback(data[prop]);
    }
    Repository.prototype.save = function(project, callback){
        var projects = JSON.parse(localStorage[this._name]).projects;

        project.id = new Date().getTime();

        projects.push(project);
        localStorage[this._name] = JSON.stringify(projects);

        callback(project);
    }

	window.app = window.app || {};
    window.app.Repository = Repository;
})(window);