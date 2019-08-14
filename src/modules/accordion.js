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

export default accordion;