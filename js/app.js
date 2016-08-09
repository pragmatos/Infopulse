(function(){
    "use strict";
    function Manager(name){
        var that = this;
        this.repository = new app.Repository(name);
        this.repository.init('data/data.json', function(){
            that.model = new app.ProjectsModel(that.repository);
            that.view = new app.ProjectsView(that.model);
            that.controller = new app.ProjectsController(that.model, that.view);
            that.controller.printAllProjects();
        });
    }

    var manager = new Manager('customers');
})();