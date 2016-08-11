(function(window){
    'use strict';

    function View(model){
        this.model = model;

        this.newProject = new app.ViewNewProject(document.querySelector('#newProject'), model);
        this.projects = new app.ViewProjects(document.querySelector('.dashboard tbody'), model);
        this.filter = new app.ViewFilterProjects(document.querySelector('form[name="filter"]'), model);

        this.$rightPanel = document.querySelector('.new-project');
        this.$thead = document.querySelector('.dashboard thead');

    }
    View.prototype.bind = function(eventName, handler){
        var that = this;
        switch (eventName) {
            case 'newProject':
                this.newProject.onSubmit(handler);
                break;
            case 'deleteProject':
                this.projects.onRemoveItem(handler);
                break;
            case 'sortProjects':
                this.projects.onSort(handler);
                break;
            case 'filterProjects':
                this.filter.onFilter(handler);
                break;
        }
    };
    View.prototype.render = function(command, parameter){
        var that = this;
        var commands = {
            addNewProject: function(){
                that.projects.appendProject(parameter);
            },
            removeProject: function(){
                that.projects.removeProject(parameter);
            },
            printAllProjects: function(){
                that.projects.printProjects(parameter);
                that.projects.sortProjects(parameter);
            },
            sortProject: function(){
                that.projects.sortProjects(parameter);
            }
        }
        commands[command]();
    };
    View.prototype._bindOnSort = function(handler){
        var that = this;
        that.$thead.addEventListener('click',function(e){
            console.log(e);
        });
    };
    View.prototype._OnFilter = function(handler){
        var that = this;
        that.$thead.addEventListener('click',function(e){
            handler({
                members:3
            });
        });
    };

    window.app = window.app || {};
    window.app.MainView = View;
})(window);