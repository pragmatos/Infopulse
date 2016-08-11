(function(){
    var button = document.querySelector('.toggle-menu'),
        main = document.querySelector('.clickable'),
        menu = document.querySelector('menu'),
        selects = document.querySelectorAll('.select');

    button.addEventListener('click', function(e){
        var t = document.querySelector('.left-panel');
        var s = document.querySelector('.dashboard');
        t.classList.toggle('show');
        s.classList.toggle('small');
        console.log(t);
    });

    for(var i = 0; i <selects.length; i++){
        selects[i].addEventListener('click', function(e){
            e.stopPropagation();
            if(e.target.tagName !== 'INPUT'){
                this.children[0].value = e.target.innerText;
                this.children[0].dispatchEvent(new Event('change',{bubbles:true}));
            }
            this.classList.toggle('active');


        });
    }

    document.addEventListener('click', function(e){
        for(var i = 0; i <selects.length;i++){
            selects[i].classList.remove('active');
        }

    });

    main.addEventListener('click', function(e){

        var t = document.querySelector('.new-project');
        t.classList.remove('show');
        console.log(t);
    },true);
})();
