window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');

    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none'; //вместо inline стилей лучше использовать классы. Вот так:
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    function showTabContent(index = 0) {
        //tabsContent[index].style.display = 'block';
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-02-14';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modal = document.querySelector('.modal'),
        btnsShowModal = document.querySelectorAll('[data-modal]'),
        btnHideModal = document.querySelector('[data-close]');

    function openModal() {
        // 1. Вариант через css классы
        modal.classList.add('show');
        modal.classList.remove('hide');

        // 2. Вариант через toggle
        //modal.classList.toggle('show');

        // При открытии модального окна нужно блокировать прокрутку базового окна
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }

    function closeModal() {
        // 1. Вариант
        modal.classList.add('hide');
        modal.classList.remove('show');

        // 2. Вариант
        //modal.classList.toggle('show');

        // При закрытии модального окна нужно восстанавливать прокрутку базового окна
        document.body.style.overflow = '';
    }

    btnsShowModal.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    btnHideModal.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // именно modal, не modal__dialog, то закрываем
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) { // https://keycode.info/
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // пользователь долистал до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        // Конвертирует доллары в грн
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Формирует верстку
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
                `;
            this.parent.append(element);
        }
    }

    //const div = new MenuCard();
    //div.render();
    // Или так:
    new MenuCard(
        "img/tabs/vegy.jpg", 
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9, 
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg", 
        'elite',
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14, 
        '.menu .container'
    ).render();
    
    new MenuCard(
        "img/tabs/post.jpg", 
        'post',
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21, 
        '.menu .container'
    ).render();
});