const tooglePopup = (modal, button) => {
    const popupCall = document.querySelector(modal),
        body = document.querySelector('body'),
        popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content');


    body.addEventListener('click', (event) => {
        let target = event.target;
        let Elem = document.querySelector('body');

        if (target.closest(button)){
            popupCall.style.display = 'block';
        }
        if (target.matches('.popup-close')) {
            popupCall.style.display = 'none';
        }
        if (target.matches('.popup')) {
            popupCall.style.display = 'none'
        }

        if (target.closest('body')) {
            Elem.style.display = 'block';
        } else {
            Elem.style.display = 'none';
        }
    });
    popup.addEventListener('click', (event) => {
        event.preventDefault();
        let target= event.target;
        if (target.classList.contains('.popup-close')){
            popupCall.style.display = 'none';
        }else{
            target = target.closest('.popup-content');
            if(!target){
                popupCall.style.display = 'none';
            }
        }
    });
};

export default tooglePopup;