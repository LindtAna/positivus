export function initSlider() {
    
    document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.reviews__slider-list');
    const slides = document.querySelectorAll('.reviews__slider-item');
    const prevButton = document.querySelector('.reviews__arrow-button.prev');
    const nextButton = document.querySelector('.reviews__arrow-button.next');
    const paginationButtons = document.querySelectorAll('.pagination__button');
    const slideWidth = slides[0].offsetWidth + 50;

    let currentIndex = 2;


    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);


    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);

    function updateSliderPosition() {
        const offset = (slider.parentElement.offsetWidth - slideWidth) / 2;
        slider.style.transform = `translateX(${-currentIndex * slideWidth + offset}px)`;
        updatePagination();
    }

    function updatePagination() {
        paginationButtons.forEach((button, index) => {
            if (index === currentIndex - 1) {
                button.classList.add('is-current');
            } else {
                button.classList.remove('is-current');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            setTimeout(() => {
                currentIndex = slides.length - 1;
                slider.style.transition = 'transform 0.5s ease-in-out';
                updateSliderPosition();
            }, 0);
        }
        updateSliderPosition();
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length + 1) {
            currentIndex++;
        } else {
            currentIndex = 1;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            setTimeout(() => {
                currentIndex = 2;
                slider.style.transition = 'transform 0.5s ease-in-out';
                updateSliderPosition();
            }, 0);
        }
        updateSliderPosition();
    });

    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentIndex = index + 1;
            updateSliderPosition();
        });
    });

    updateSliderPosition();
});

}