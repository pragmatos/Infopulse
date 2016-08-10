(function(window){
    'use strict';

    function View(model){
        this.model = model;

        this.$projects = document.querySelector('.dashboard tbody');
        this.$buttonNewProject = document.querySelector('.add-project');
        this.$rightPanel = document.querySelector('.new-project');
        this.$newProject = document.querySelector('#newProject');
        this.$submitProject = this.$newProject['add'];
    }
    View.prototype.bind = function(eventName, handler){
        var that = this;
        switch (eventName) {
            case 'newProject':
                that._bindAddProjectEvents(handler);
                break;
            case 'deleteProject':
                that._bindRemoveItem(handler);
                break;
            case 'openNewProject':
                that._bindOpenNewProject();
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
    View.prototype._bindAddProjectEvents = function(handler){
        var that = this;
        that.$newProject.addEventListener('submit', function(e){
            var project = {},
                length = that.$newProject.length-1;
            e.preventDefault();
            if(that.$newProject.checkValidity()){
                for(var i = 0; i < length; i++){
                    project[that.$newProject[i].name] = that.$newProject[i].value;
                    that.$newProject[i].value = "";
                }
                project.dueDate = that.model.convertDate(project.dueDate);
                project.createdDate = that.model.convertDate(project.createdDate);
                that.$submitProject.disabled = true;
                that.$rightPanel.classList.remove('show');
                handler(project);
            }

        });
        that.$newProject.addEventListener('change', function(e){
            if(that.$newProject.checkValidity()){
                that.$submitProject.disabled = false;
            }
        });
    }
    View.prototype._bindRemoveItem = function(handler){
        var that = this;
        that.$projects.addEventListener('click', function(e){
            if(e.target.getAttribute('data-id')){
                handler(parseInt(e.target.getAttribute('data-id')));
            }

        });
    }
    View.prototype._bindOpenNewProject = function(){
        var that = this;

        that.$buttonNewProject.addEventListener('click', function(){
            that.$rightPanel.classList.toggle('show');
            that.model.getTypes(function(data){
                that._printSelect('#types', data);
            });
            that.model.getCustomers(function(data){
                that._printSelect('#customers', data);
            });
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