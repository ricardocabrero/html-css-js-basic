function fnMenu(){
    var btnOpen = document.querySelector('.btn-open'),
    btnClose = document.querySelector('.btn-close'),
    layerMenu = document.querySelector('.menu-layer');
    
    btnOpen.addEventListener('click', function(){
        layerMenu.className += ' active';
        document.body.style.overflowY = 'hidden'
    })
    btnClose.addEventListener('click', function(e){
        layerMenu.className = 'menu-layer';
        document.body.style.overflowY = 'visible'
        e.stopPropagation();
    })
};

function carrusel(buttons,slides,intervalTimer){
    var buttons  = document.querySelectorAll(buttons),
    slides = document.querySelectorAll(slides),
    layers = document.querySelectorAll('.layer-slide'),
    idBtn,
    currentActive,
    intervalTimer,
    interval;

    this.handleClick = function(){
         for( var i = 0; i < buttons.length; i ++ ){
             buttons[i].addEventListener('click', function(e){
                 if(document.querySelector('.first-inactive') !== null){
                    document.querySelector('.first-inactive').className = 'layer-slide';
                 }                
                 idBtn = e.target.id;
                 idBtn = idBtn.substring(5,e.target.id.length)
                 for( var x = 0; x < slides.length; x ++ ){
                     slides[x].className = 'slide';  
                     buttons[x].className = ' ';
                     this.className = 'selected';                        
                 }
                 slides[idBtn].className = 'slide active';
             })
         }
    }

    this.handleAutoInit = function(){
        currentActive = document.querySelector('.bullets a.selected');
        currentActive = currentActive.id.substring(5,currentActive.id.length)
        currentActive = parseInt(currentActive);
        currentActive === buttons.length - 1 
        ? buttons[0].click()
        : buttons[currentActive + 1].click();
    }

    this.handleTimer = function(){
        interval = window.setInterval(this.handleAutoInit,intervalTimer);
    }

    this.handleMouseEnter = function(){
        for( var i = 0; i < buttons.length; i ++){
            buttons[i].addEventListener('mouseenter',function(){
                clearInterval(interval);
            })   
        }  
    }

    this.handleMouseOut = function(){
        var _that = this;
        for( var i = 0; i < buttons.length; i ++){
            buttons[i].addEventListener('mouseout',function(){
                _that.handleTimer();
            })   
        }  
    }

    this.init = function(){
        slides[0].className = 'slide active';
        buttons[0].className = 'selected';
        layers[0].className += ' first-inactive';
        this.handleClick();
        this.handleTimer();
        this.handleMouseEnter();
        this.handleMouseOut();
    }

    this.init();
};

window.addEventListener('DOMContentLoaded', function(){
    fnMenu(); 
    var sliderX = new carrusel(
        '.bullets a',
        '.slide',
        4000
    ); 
})