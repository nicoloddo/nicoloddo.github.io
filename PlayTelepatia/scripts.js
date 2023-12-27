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
    var rotationStep = 2; // Adjust the sensitivity of rotation
    var tempRotation = guesserRotation + deltaX * rotationStep;
    
    if(tempRotation <= 100 && tempRotation >= -100) {
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


let usedLines = []; // Array to store used lines

document.getElementById('extractScaleButton').addEventListener('click', function() {
    fetch('https://raw.githubusercontent.com/nicoloddo/nicoloddo.github.io/main/PlayTelepatia/scales/ita/default.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        let randomLine;
        let attempts = 0;

        do {
            randomLine = lines[Math.floor(Math.random() * lines.length)];
            attempts++;
            // Prevent infinite loop if all lines have been used
            if (attempts > lines.length) break;
        } while (usedLines.includes(randomLine));

        if (!usedLines.includes(randomLine)) {
            const [leftWriting, rightWriting] = randomLine.split(':');
            document.getElementById('left-text').textContent = leftWriting;
            document.getElementById('right-text').textContent = rightWriting;
            usedLines.push(randomLine); // Add the used line to the array
        } else {
            console.log("All lines have been used.");
        }
    })
    .catch(error => {
        console.error('Error fetching the scales.txt file:', error);
    });
});