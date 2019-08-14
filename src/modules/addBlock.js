const  addBlock = () => {
    const addSentenceBtn = document.querySelector('.add-sentence-btn'),
        shadowBlock = document.querySelectorAll('.hidden'),
        visibleSmBlock = document.querySelector('.visible-sm-block');

    addSentenceBtn.addEventListener('click', (event)=>{
        let target = event.target
        if (target.classList.contains('add-sentence-btn')){
            for (let i = 0; i < shadowBlock.length; i++){
                if (i < 4){
                    shadowBlock[i].classList.remove('hidden');
                    visibleSmBlock.classList.remove('visible-sm-block');
                    addSentenceBtn.style.display = 'none';
                }
            }
        }
    });
};

export default addBlock;