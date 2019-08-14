'use strict';

import tooglePopup from './modules/tooglePopup';
import sendMainForm from './modules/sendMainForm';
import accordion from './modules/accordion';
import calc from './modules/calc';
import addBlock from './modules/addBlock';

//перезвони мне-------------------------------------------------------------------
tooglePopup('.popup-call', '.construct-btn .call-btn');
tooglePopup('.popup-discount', '.call-btn');
tooglePopup('.popup-check', '.discount-btn');
tooglePopup('.popup-consultation', '.check-btn');
tooglePopup('.popup-consultation', '.director-btn');
//отправка формы------------------------------------------------------
sendMainForm('.main-form');
sendMainForm('.director-form');
sendMainForm('.capture-form');
sendMainForm('.popup-call');
sendMainForm('.popup-consultation .capture-form');
sendMainForm('.popup-check .capture-form');
sendMainForm('.popup-discount .capture-form');
//аккордион--------------------------------------------------------------------------
accordion('accordion');
accordion('accordion-two');
// калькулятор-----------------------------------------------
calc();
//Дополнительные блоки
addBlock();