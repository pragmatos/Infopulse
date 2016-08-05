(function(){
    "use strict";
    function Manager(data){
        this.repository = new app.Repository(data);
        this.model = new app.ProjectsModel([{name:"test"}]);
    }
    
    var manager = new Manager([]);

    console.log(app.Lib.data);
})();