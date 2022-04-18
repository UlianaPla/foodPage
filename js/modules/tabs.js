function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    // Tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none'; //вместо inline стилей лучше использовать классы. Вот так:
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }


    function showTabContent(index = 0) {
        //tabsContent[index].style.display = 'block';
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
                const target = event.target;

                if (target && target.classList.contains(tabsSelector.slice(1))) { // slice из строки-селектора вырежет точку вначале. Получится название класса.
                            tabs.forEach((item, index) => {
                                if (target == item) {
                                    hideTabContent();
                                    showTabContent(index);
                                }
                            });
                        }
                    });
            }

            export default tabs;