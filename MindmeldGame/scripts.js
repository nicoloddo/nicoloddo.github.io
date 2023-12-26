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