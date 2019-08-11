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
    const checkBox1 = document.querySelector('#myonoffswitch'),
        checkBox2 = document.querySelector('#collapseThree .onoffswitch'),
        select1 = document.querySelectorAll('.select-box select')[0],
        select2 = document.querySelectorAll('.select-box select')[1],
        select3 = document.querySelectorAll('.select-box select')[2],
        select4 = document.querySelectorAll('.select-box select')[3],
        select11 = document.querySelectorAll('.select-box')[0],
        select22 = document.querySelectorAll('.select-box')[1],
        select33 = document.querySelectorAll('.select-box')[2],
        select44 = document.querySelectorAll('.select-box')[3],
        titleText = document.querySelectorAll('.title-text'),
        lastInput = document.querySelector('#collapseFour input'),
        calcResult = document.querySelector('#calc-result'),
        btnOne = document.querySelectorAll('.construct-btn'),
        allBlock = document.getElementById('accordion'),
        getResult = document.querySelector('#collapseFour .construct-btn');
    let total = 10000,
        diametr1 = '1.4 метра',
        col1 = '1 штука',
        diametr2 = '2 метра',
        col2 = '1 штука',
        dno = 0;

    const getCalcResult = () => {
      let select1Value = select1.options[select1.selectedIndex].value,
        select2Value = select2.options[select2.selectedIndex].value,
        select3Value = select3.options[select3.selectedIndex].value,
        select4Value = select4.options[select4.selectedIndex].value;
      select1Value === '2 метра' ? diametr1 = 1.2 : diametr1 = 1;
     if (select2Value === '2 штуки'){
         col1 = 1.3;
     }else if(select2Value === '3 штуки'){
         col1 = 1.5;
     }else {
         col1 = 1;
     }
        select3Value === '2 метра' ? diametr2 = 1.2 : diametr2 = 1;
        if (select4Value === '2 штуки'){
            col2 = 1.3;
        }else if(select4Value === '3 штуки'){
            col2 = 1.5;
        }else {
            col2 = 1;
        }
    };

    checkBox1.addEventListener('input',  (event)=>{
        checkBox1.checked ? total = 10000 : total = 15000;
    });
    checkBox2.addEventListener('change', ()=>{
        if (checkBox1.checked || checkBox2.checked){
            dno = 1000;
        }else if(checkBox2.checked){
            dno = 2000;
        }else{
            dno = 0;
        }
    });
    btnOne[0].addEventListener('click', ()=> {
        if (checkBox1.checked) {
            titleText[1].style.display = 'none';
            select33.style.display = 'none';
            select44.style.display = 'none';
            titleText[0].style.display = 'inline-block';
            select11.style.display = 'inline-block';
            select22.style.display = 'inline-block';

        } else {
            titleText[1].style.display = 'inline-block';
            select33.style.display = 'inline-block';
            select44.style.display = 'inline-block';
            titleText[0].style.display = 'none';
            select11.style.display = 'none';
            select22.style.display = 'none';

        }
    });
    allBlock.addEventListener('input', (event)=>{
        let target = event.target;
        if (target.matches('select') || target.matches('input') || target.matches('button .construct-btn')){
            getCalcResult();

        }
    });
    getResult.addEventListener('click', ()=>{
        if (getResult){
            total = total * col1 * col2 * diametr1 * diametr2 + dno;
            calcResult.placeholder = total;
        }
    });
    };
calc();