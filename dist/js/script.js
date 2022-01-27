window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');

    function hideTabContent(){
        tabsContent.forEach(item => {
            //item.style.display = 'none'; //вместо inline стилей лучше использовать классы. Вот так:
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');  
        });
    }


    function showTabContent(index = 0){
        //tabsContent[index].style.display = 'block';
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, index) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
});