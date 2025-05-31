window.onscroll = onScroll;

function onScroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.classList.remove("scroll-top");
    } else {
        document.body.classList.add("scroll-top");
    }
}

function getRandomPosition() {
    var x = window.innerWidth;
    var y = window.innerHeight;
    var randomX = Math.floor(Math.random() * (x - 40)) + 20;
    var randomY = Math.floor(Math.random() * (y - 40)) + 20;
    return [randomX, randomY];
}

var bubbleElements = document.querySelectorAll('.bubble');

bubbleElements.forEach(function(bubbleElement) {
    var randomPosition = getRandomPosition();
    bubbleElement.style.top = randomPosition[0] + 'px';
    bubbleElement.style.left = randomPosition[1] + 'px';

    var randomMovementX = Math.floor(Math.random() * 21) - 10;
    var randomMovementY = Math.floor(Math.random() * 21) - 10;
    // needed to extract the function you wrote in the interval:
    function bubbleFunction() {
        var currentTop = parseInt(bubbleElement.style.top);
        var currentLeft = parseInt(bubbleElement.style.left);
        var newTop = currentTop + randomMovementY;
        var newLeft = currentLeft + randomMovementX;

        if (newTop < 0 || newTop > window.innerHeight + 100) {
            randomMovementY = -randomMovementY;
            newTop = currentTop + randomMovementY;
        }

        if (newLeft < 0 || newLeft > window.innerWidth + 100) {
            randomMovementX = -randomMovementX;
            newLeft = currentLeft + randomMovementX;
        }

        bubbleElement.style.top = newTop + 'px';
        bubbleElement.style.left = newLeft + 'px';
    }
// name the interval so we can clear it on hover
    let interval = setInterval(bubbleFunction, 150);

    bubbleElement.addEventListener('mouseover', () => clearInterval(interval));
    bubbleElement.addEventListener('mouseout', () => setInterval(bubbleFunction, 150));

    bubbleElement.addEventListener('click', function() {
        bubbleElement.classList.add('bubble-clicked');
        setTimeout(function() {
            bubbleElement.remove();
        }, 500);
    });
});

const cardbtn = document.querySelector('.card-text-display')
const cardimg = document.querySelector('.card-img-top')

cardbtn.addEventListener("click", function () {
    cardimg.classList.toggle('show');
})
