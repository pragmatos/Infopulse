(function(window){
	"use strict";
	function Repository(name){
		this._name = name;

        if(!localStorage[this._name]){
            localStorage[this._name] = JSON.stringify([]);
        }
	}
    Repository.prototype.init = function(url, callback){
        var that = this;
        app.Lib.$json(url, function(data){
            if(data){
                localStorage[that._name] = JSON.stringify(data);
            }
            callback();
        });

    }
    Repository.prototype.getBy = function(prop, callback){
        var data = JSON.parse(localStorage[this._name]);

        callback(data[prop]);
    }
    Repository.prototype.save = function(project, callback){
        var data = JSON.parse(localStorage[this._name]),
            projects = data.projects,
            newProject = project;

        newProject.id = new Date().getTime();

        projects.push(newProject);
        data.projects = projects;
        localStorage[this._name] = JSON.stringify(data);

        callback(newProject);
    }
    Repository.prototype.remove = function(id, callback) {
        var data = JSON.parse(localStorage[this._name]),
            projects = data.projects;
        for (var i = 0; i < projects.length; i++) {
            console.log(id, projects[i].id);
            if (projects[i].id === id) {
                projects.splice(i, 1);
                break;
            }
        }
        data.projects = projects;
        localStorage[this._name] = JSON.stringify(data);
        callback(projects);
    }

	window.app = window.app || {};
    window.app.Repository = Repository;
})(window);