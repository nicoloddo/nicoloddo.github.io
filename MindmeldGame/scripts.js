document.getElementById('spinButton').addEventListener('click', function() {
    var arrow = document.getElementById('arrow');
    var randomSpeed = Math.random() * 160 - 80; // Adjusted to range from -80 to 80 degrees
    arrow.style.transform = 'rotate(' + randomSpeed + 'deg)';
});

document.getElementById('lidButton').addEventListener('click', function() {
    var lid = document.getElementById('lid');
    if (lid.classList.contains('lid-visible')) {
        lid.classList.remove('lid-visible');
        lid.classList.add('lid-invisible');
    } else {
        lid.classList.remove('lid-invisible');
        lid.classList.add('lid-visible');
    }
});

var guesserRotation = 0;
var initialTouchX;

function rotateGuesser(deltaX) {
    var rotationStep = 1; // Adjust the sensitivity of rotation
    var tempRotation = guesserRotation + deltaX * rotationStep;
    if(tempRotation <= 90 && guesserRotation >= 0) {
        guesserRotation += deltaX * rotationStep;
        document.getElementById('guesser').style.transform = 'rotate(' + guesserRotation + 'deg)';
    }
}

document.addEventListener('keydown', function(event) {
    var deltaX = 0;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        deltaX = 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        deltaX = -1;
    }
    rotateGuesser(deltaX);
});

// Touch event listeners
document.getElementById('guesser').addEventListener('touchstart', function(event) {
    initialTouchX = event.touches[0].clientX;
}, { passive: true });

document.getElementById('guesser').addEventListener('touchmove', function(event) {
    var currentTouchX = event.touches[0].clientX;
    var deltaX = currentTouchX - initialTouchX;
    rotateGuesser(deltaX);
    initialTouchX = currentTouchX; // Update initial touch position
}, { passive: true });