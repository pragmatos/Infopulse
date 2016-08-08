(function(){
    "use strict";
    function Manager(data){
        this.repository = new app.Repository(data);
        this.model = new app.ProjectsModel(this.repository);
    }

    var manager = new Manager('customers');
    manager.repository.init(function(){
        console.log('loaded');
    });
    console.log(app.Lib.data);
})();