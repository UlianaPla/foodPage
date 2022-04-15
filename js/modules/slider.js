function slider() {

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        currentSpan = document.querySelector('#current'),
        maxSpan = document.querySelector('#total'),
        prevBtn = document.querySelector('.offer__slider-prev'),
        nextBtn = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesCount = slides.length;

    let slideInd = 1;
    let offset = 0;

    slidesField.style.width = 100 * slidesCount + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // теперь все элементы которые спозиционированны абсолютно внутри слайдера, будут нормально отображаться

    const indicators = document.createElement('ol'), //ol - ordered List
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('li'); //li - list item
        dot.setAttribute('data-slide-to', i + 1); // устанавливаем атрибут- соответствие точки к слайду
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    currentSpan.innerHTML = getZero(slideInd);
    maxSpan.innerHTML = getZero(slidesCount);

    const slideWidthNum = +width.replace(/[a-zA-Z]/g, ''); // преобразует строку '500px' в число 500

    const getOffsetBySlide = (slideInd) => slideWidthNum * slideInd;

    nextBtn.addEventListener('click', () => {
        if (slideInd == slidesCount) {
            slideInd = 1;
        } else {
            slideInd++;
        }

        showSlide(slideInd);
    });

    prevBtn.addEventListener('click', () => {
        if (slideInd == 1) {
            slideInd = slidesCount;
        } else {
            slideInd--;
        }

        showSlide(slideInd);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideInd = slideTo;
            showSlide(slideInd);
        });
    });

    function showSlide(slideNum) {

        offset = getOffsetBySlide(slideNum - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        currentSpan.innerHTML = getZero(slideNum);
        highlightDot(slideNum - 1);
    }

    function highlightDot(dotIndex) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[dotIndex].style.opacity = 1;
    }
}

module.exports = slider;