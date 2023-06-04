function init() {
    sec = 0;
    setInterval(tick, 1000);
}

function tick() {
    sec++;
    document.getElementById('timer').innerHTML = "Timer:  " + sec;
}
