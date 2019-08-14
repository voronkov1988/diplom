function sendMainForm (forms,calc) {
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
        });
    });

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem';

    mainForm.addEventListener('submit', (event) => {
        event.preventDefault();
        mainForm.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        let select1 = document.querySelectorAll('.select-box select')[0],
            select2 = document.querySelectorAll('.select-box select')[1],
            select3 = document.querySelectorAll('.select-box select')[2],
            select4 = document.querySelectorAll('.select-box select')[3];
        let select1Value = select1.options[select1.selectedIndex].value,
            select2Value = select2.options[select2.selectedIndex].value,
            select3Value = select3.options[select3.selectedIndex].value,
            select4Value = select4.options[select4.selectedIndex].value,
            lastInput = document.querySelector('#collapseFour input');
        const formData = new FormData(mainForm, select1Value, select2Value, select3Value, select4Value);
        let checkBox1 = document.querySelector('#myonoffswitch');
        let body = {};
        if (checkBox1.checked) {
            body['metres'] = lastInput.value;
            body['value-diametr'] = select3Value;
            body['value-col'] = select4Value;

            formData.forEach((val, key) => {
                body[key] = val;
            });
        } else{
            body['metres'] = lastInput.value;
            body['value-diametr'] = select1Value;
            body['value-col'] = select2Value;
            formData.forEach((val, key) => {
                body[key] = val;
            });
        }

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
export default sendMainForm;