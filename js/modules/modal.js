function openModal(modalSelector, modalTimerId) {

    const modal = document.querySelector(modalSelector);

    // 1. Вариант через css классы
    modal.classList.add('show');
    modal.classList.remove('hide');

    // 2. Вариант через toggle
    //modal.classList.toggle('show');

    // При открытии модального окна нужно блокировать прокрутку базового окна
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {

    const modal = document.querySelector(modalSelector);

    // 1. Вариант
    modal.classList.add('hide');
    modal.classList.remove('show');

    // 2. Вариант
    //modal.classList.toggle('show');

    // При закрытии модального окна нужно восстанавливать прокрутку базового окна
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    // Modal

    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // именно modal, не modal__dialog, то закрываем
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) { // https://keycode.info/
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // пользователь долистал до конца
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {
    closeModal
};
export {
    openModal
};