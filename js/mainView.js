(function(window){
    'use strict';

    function View(model){
        this.model = model;

        this.newProject = new app.ViewNewProject(document.querySelector('#newProject'), model);

        this.$projects = document.querySelector('.dashboard tbody');
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
                that._bindRemoveItem(handler);
                break;
            case 'openNewProject':
                //that._bindOpenNewProject();
                break;
            case 'sortProjects':
                that._bindOnSort(handler);
                break;
        }
    }
    View.prototype.render = function(command, parameter){
        var that = this;
        var commands = {
            addNewProject: function(){
                that._appendProject(parameter);
            },
            removeProject: function(){
                that._removeProject(parameter);
            },
            printAllProjects: function(){
                that._printProjects(parameter);
            }
        }
        commands[command]();
    }
    View.prototype._removeProject = function(id){
        var tr = document.querySelector('tr[data-id="'+id+'"]');
        this.$projects.removeChild(tr);
    }
    View.prototype._bindOnSort = function(handler){
        var that = this;
        that.$thead.addEventListener('click',function(e){
            console.log(e);
        });
    }
    View.prototype._appendProject = function(project){
        var printObj = {
            name: project.name,
            dueDate: this.model.getNormalDate(project.dueDate),
            createdDate: this.model.getNormalDate(project.createdDate),
            members: project.members,
            type: project.type,
            status: this.model.isActive(project),
            customer: project.customer
        },
            row = this.$projects.insertRow(),
            cell,
            index = 0;
        for(var key in printObj){
            cell = row.insertCell(index);
            cell.innerText = printObj[key];
            index++;
        }
        cell = row.insertCell(index);
        cell.innerHTML = '<button data-id="'+project.id+'" class="delete-project"></button>';
        row.setAttribute("data-id", project.id);
        if(!printObj['status']){
            row.classList.add('overdue');
        }

    }
    View.prototype._bindRemoveItem = function(handler){
        var that = this;
        that.$projects.addEventListener('click', function(e){
            if(e.target.getAttribute('data-id')){
                handler(parseInt(e.target.getAttribute('data-id')));
            }

        });
    }
    View.prototype._printProjects = function(projects){
        var that = this;
        projects.forEach(function(project){
            that._appendProject(project);
        });
    }
    View.prototype._printSelect = function(selector, data){
        var select = document.querySelector(selector),
            li;
        select.innerHTML = '';
        data.forEach(function(item){
            li = document.createElement('li');
            li.innerText = item.name;
            li.setAttribute('data-value', item.name);
            select.appendChild(li);
        });
    }

    window.app = window.app || {};
    window.app.ProjectsView = View;
})(window);