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

    checkBox1.addEventListener('change',  (event)=>{
        checkBox1.checked ? total = 10000 : total = 15000;
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
    checkBox2.addEventListener('change', ()=>{
        if (checkBox1.checked || checkBox2.checked){
            dno = 1000;
        }else if(checkBox2.checked){
            dno = 2000;
        }else{
            dno = 0;
        }
    });

    allBlock.addEventListener('change', (event)=>{
        let target = event.target;
        if (target.matches('select') || target.matches('input') || target.matches('button .construct-btn')){
            getCalcResult();
            calcResult.placeholder = total;
        }
    });
    getResult.addEventListener('click', (event)=>{
        event.preventDefault();
        if (getResult){
            total = total * col1 * col2 * diametr1 * diametr2 + dno;
            calcResult.placeholder = total;
        }
        if (isNaN(calcResult.placeholder)){
            calcResult.placeholder = 'чтото пошло не так';
        }
    });
};

export default calc;