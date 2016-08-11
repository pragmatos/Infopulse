(function(window){
    'use strict';

    function View(element, model){
        this.$dashboard = element;
        this.model = model;

        this.$thead = document.querySelector('.dashboard thead');

    }
    View.prototype.removeProject = function(id){
        var tr = document.querySelector('tr[data-id="'+id+'"]');
        this.$dashboard.removeChild(tr);
    };
    View.prototype._bindOnSort = function(handler){
        var that = this;
        that.$thead.addEventListener('click',function(e){
            console.log(e);
        });
    };
    View.prototype.appendProject = function(project){
        var printObj = {
                name: project.name,
                dueDate: this.model.getNormalDate(project.dueDate),
                createdDate: this.model.getNormalDate(project.createdDate),
                members: project.members,
                type: project.type,
                status: this.model.isActive(project)?"Active":"Completed",
                customer: project.customer
            },
            row = this.$dashboard.insertRow(),
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
        if(!this.model.isActive(project)){
            row.classList.add('overdue');
        }
    };
    View.prototype.onRemoveItem = function(handler){
        this.$dashboard.addEventListener('click', function(e){
            if(e.target.getAttribute('data-id')){
                if(confirm("You are sure?"))
                    handler(parseInt(e.target.getAttribute('data-id')));
            }
        });
    };
    View.prototype.printProjects = function(projects){
        var that = this;
        this.$dashboard.innerHTML = '';
        projects.forEach(function(project){
            that.appendProject(project);
        });
    };
    window.app = window.app || {};
    window.app.ViewProjects = View;
})(window);