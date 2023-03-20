window.onload = init;
window.onresize = resize;

const GETNode = x => document.querySelector(x);
const GETAllNodes = x => document.querySelectorAll(x);

function init(){
  const ShareButton = GETNode("#share-btn");
          ShareButton.floatBox = GETNode("#floating-box");

          // Click Share Button - Open
          ShareButton.openClick = function(){
            this.style.backgroundColor = "var(--dkn-grayish-blue)"
            this.children[0].style.filter = "brightness(3)";

            this.floatBox.style.display = "flex";
            this.floatBox.classList.add("moving-box");

            this.open = true;
          }

          // Click Share Button - Close 
          ShareButton.closeClick = function(){
            this.style.backgroundColor = ""
            this.children[0].style.filter = "";

            this.floatBox.style.display = "none";
            this.floatBox.classList.remove("moving-box");

            this.open = false;
          }

    window.addEventListener('click', function(e){
        if ( ![...ShareButton.children].includes(e.target) ){
          ShareButton.closeClick();
        }else{
          if ( !ShareButton.open ){ ShareButton.openClick(); }
        }
    })

    resize();
}

function resize(){
  const ShareButton = GETNode("#share-btn");
  if ( window.innerWidth > 550 ){
    ShareButton.floatBox.classList.add("desk-box");
    ShareButton.floatBox.classList.remove("mobile-box");
  }else{
    ShareButton.floatBox.classList.remove("desk-box");
    ShareButton.floatBox.classList.add("mobile-box");
  }
}