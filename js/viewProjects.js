(function(window){
    'use strict';

    function View(element, model){
        this.$dashboard = element;
        this.model = model;

        this.$thead = document.querySelector('.dashboard thead');

        this.sortParam = {
            indexCell: 0,
            order: -1
        }

    }
    View.prototype.removeProject = function(id){
        var tr = document.querySelector('tr[data-id="'+id+'"]');
        this.$dashboard.removeChild(tr);
    };
    View.prototype.onSort = function(handler){
        var that = this,
            th = that.$thead.children[0].children[0];
        that.$thead.addEventListener('click',function(e){
            var target = e.target;
            if(target.getAttribute("data-sort")){
                if(th && that.sortParam.indexCell !== target.cellIndex){
                    that.sortParam.order = 1;
                    th.classList.remove('asc');
                    th.classList.remove('desc');
                    target.classList.add('asc');
                    th = target;
                }
                else{

                    if(that.sortParam.order == -1){
                        target.classList.add('asc');
                        target.classList.remove('desc');

                    }
                    if(that.sortParam.order == 1){
                        target.classList.add('desc');
                        target.classList.remove('asc');
                    }
                    that.sortParam.order *= -1;
                }
                that.sortParam.indexCell = target.cellIndex;

                handler();
            }
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
            cell.setAttribute('data-value', printObj[key].toLowerCase());
            if(key == 'dueDate' || key == 'createdDate'){
                cell.setAttribute('data-value', this.model.convertDate(printObj[key]));
            }
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
    View.prototype.sortProjects = function(){
        var that = this;
        function getCellValue(row){
            return row.cells.item(that.sortParam.indexCell).getAttribute('data-value');
        }
        function compareString(a, b){
            var va = getCellValue(a), vb = getCellValue(b);
            if(va < vb){
                return -1*that.sortParam.order;
            }
            if(va > vb){
                return 1*that.sortParam.order;
            }
            return 0;
        }
        var rows = [].sort.call([].slice.call(that.$dashboard.rows,0), compareString);
        if(that.sortParam.order == 'asc')
            [].reverse.call(rows);
        [].forEach.call(rows,function(row){
            that.$dashboard.appendChild(row);
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