function modal(){

    // Modal

    const modal = document.querySelector('.modal'),
        btnsShowModal = document.querySelectorAll('[data-modal]');

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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // именно modal, не modal__dialog, то закрываем
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

}

module.exports = modal;