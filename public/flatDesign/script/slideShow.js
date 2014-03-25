window.addEventListener('resize', changeBckgroundSlideSize);

document.body.addEventListener('click', function(event) {
    if (event.target.className.search('gallery-zoom-btn') != -1) openSlideShow(event.target.parentNode);
    if ((event.target.className.search('slide-close-btn') != -1) || (event.target.className.search('backgroundSpace') != -1))
      closeSlideShow(event.target.parentNode);
    if (event.target.className.search('slide-next-btn') != -1) changePhotoSlide(true);
    if (event.target.className.search('slide-prev-btn') != -1) changePhotoSlide(false);
}, true);

var arraySrcList=[],
    inputDataObject = [{"links":{"XXS":{"width":75,"href":"http://img-fotki.yandex.ru/get/9827/231475615.0/0_cdc6d_a01a0758_XXS","height":75}}}];


// Функция открывает окно слайд-обозревателя
function openSlideShow(imgContainerGallery){
 
  function getClientHeight(){
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
  }

  var mainWindowSlide = document.getElementById('slideShow'),
      thisImgSrc = imgContainerGallery.childNodes[5].childNodes[1].src;

  for (var i = 0; i < inputDataObject.length; i++){
    arraySrcList[i] = inputDataObject[i].links.orig.href;
  }

  mainWindowSlide.style.display = 'block';

  if (getClientHeight() > 750) mainWindowSlide.style.top = (getClientHeight() - 750) / 2 + 'px';

  document.getElementsByClassName('backgroundSpace')[0].style.display = 'block';

  changeBckgroundSlideSize();

  setPhotoToSlide(thisImgSrc);

}

// Функция закрытия слайд-обозревателя
function closeSlideShow(){
  document.getElementById('slideShow').style.display = "none";
  document.getElementsByClassName('backgroundSpace')[0].style.display = "none";
  document.getElementById('slide-img').style.opacity = '0';
}

// Функция открывает фотографию в слайд-обозревателе
function setPhotoToSlide(inputPhoto){

  var slideImg = document.getElementById('slide-img'),
      originalImg = new Image();

  slideImg.removeAttribute('width');
  slideImg.removeAttribute('height');
  slideImg.src = inputPhoto;
  originalImg.src = inputPhoto;

  originalImg.onload = function(){
    var originalHeight = originalImg.height,
        originalWidth = originalImg.width,
        differentSize;

    if ((originalHeight > 750) || (originalWidth > 1100)){

      if (originalHeight > originalWidth){
        slideImg.setAttribute('height', '750px');
      }

      if (originalWidth > originalHeight){
        differentSize = 1100 * originalHeight / originalWidth;
        if (differentSize > 750){
          slideImg.setAttribute('height', '750px');
        } else{
          slideImg.setAttribute('width', '1100px');
        }
      }

    }
    document.getElementsByClassName('slide-load-img')[0].style.display = "none";
    slideImg.style.opacity = "1";

    return;
  }
}

// Функция определяет следующую необходимую фотографию
function changePhotoSlide(bool){
  var nowImg = document.getElementById('slide-img'),
      loadIndicator = document.getElementsByClassName('slide-load-img')[0],
      positionPhoto;

  function find(array, value) {
    for(var i = 0; i < array.length; i++) {
      if (array[i] == value) return i;
    }
    return -1;
  }

  positionPhoto = find(arraySrcList, nowImg.src);
  if (bool){
    if (positionPhoto != arraySrcList.length - 1){
      nowImg.style.opacity = '0';
      loadIndicator.style.display = 'block';
      setPhotoToSlide(arraySrcList[positionPhoto + 1]);
    }
  } else {
    if (positionPhoto != 0){
      nowImg.style.opacity = '0';
      loadIndicator.style.display = 'block';
      setPhotoToSlide(arraySrcList[positionPhoto - 1]);
    }
  }
}

// Функция подстройки зайднего фона при режиме обозревателя фото
function changeBckgroundSlideSize(){
  function getClientWidth(){
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
  }
 
  function getClientHeight(){
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
  }

  var  backgroundBlock = document.getElementsByClassName('backgroundSpace')[0];

  backgroundBlock.style.width = getClientWidth() + 'px';
  backgroundBlock.style.height = getClientHeight() + 'px';
}