'use strict';

//перезвони мне-------------------------------------------------------------------
const tooglePopup = () => {
    const tellMe = document.querySelectorAll('.call-btn'),
        popupCall = document.querySelector('.popup-call'),
        popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    tellMe.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (mobile) {
                popupCall.style.display = 'block';
            }else{
                popupCall.style.display = 'block';
                let topPosition = 110 - popupCall.clientWidth;
                let animation = () => {
                    popupContent.style.top = `${topPosition}px`;
                    if (popupContent.getBoundingClientRect().top < 100) {
                        topPosition += 10;
                    }else{
                        clearInterval(pix);
                    }
                };
                let pix = setInterval(animation, 1);
            }
        });
    });
    popup.addEventListener('click', (event) => {
        let target= event.target;
        if (target.classList.contains('popup-close')){
            popupCall.style.display = 'none';
        }else{
            target = target.closest('.popup-content');
            if(!target){
                popupCall.style.display = 'none';
            }
        }
    });
};
tooglePopup();


//отправка формы------------------------------------------------------

const sendMainForm = (forms) => {
    const errorMessage = 'Чтото пошло не так',
        loadMessage = 'загрузка',
        succesMessage = 'Спасибо! мы скоро с вами свяжемся!';
    const mainForm = document.querySelector(forms),
        allinputs = mainForm.querySelectorAll('input');
    allinputs.forEach(input => {
        let type = input.getAttribute('type');
        input.addEventListener('input', (event) => {
            if (type === 'tel') {
                input.value = input.value.replace(/[^+\d]/gi, '');
            }else if (type === 'text' || input.classList.contains('mess')){
                input.value = input.value.replace(/[^а-яё\s]/gi, '');
            }
            console.log(mainForm);
        });
    });

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem';

    mainForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(mainForm);
        mainForm.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(mainForm);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then((response) => {
                if (response.status !== 200) throw new Error('status network not 200');
                statusMessage.textContent = succesMessage;
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
        });
        allinputs.forEach(elem => {
            elem.value = '';
        })
    });
    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    };
};
sendMainForm('.main-form');
sendMainForm('.director-form');
sendMainForm('.capture-form');
sendMainForm('.popup-call .capture-form');



//аккордион--------------------------------------------------------------------------

const accordion = (panel) => {
    const panelGroup = document.getElementById(panel),
        allPanel = document.querySelectorAll('.panel-collapse'),
        calcButton = document.querySelectorAll('.construct-btn'),
        panelTitle = document.querySelectorAll('.panel-heading');
    const toggleTab = (index, index2) => {
        event.preventDefault();
      for (let i = 0; i < allPanel.length; i++){
          if (index === i){
              allPanel[i].style.display = 'block';
              console.log('click');
          }else if(index2 === i){
              allPanel[i].style.display = 'block';
          }
          else{
              allPanel[i].style.display = 'none';
          }
      }
    };
panelGroup.addEventListener('click', (event)=>{
    // event.preventDefault();
    let target = event.target;
    let target2 = event.target;
    target = target.closest('.panel-heading');
    target2 = target2.closest('.construct-btn');
    if (target){
        panelTitle.forEach((item, index)=>{
            if(item === target){
                toggleTab(index);
            }
        });
    }else{
        calcButton.forEach((item2, index)=>{
            if(item2 === target2){
                toggleTab(index+1);
            }
        });
    }
});
};
accordion('accordion');
accordion('accordion-two');

// калькулятор-----------------------------------------------

const calc = () => {

};