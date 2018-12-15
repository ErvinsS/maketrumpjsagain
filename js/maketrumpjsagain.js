// widgets script loading taken from Twitter
window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

twttr.ready(function (twttr) {
    twttr.events.bind("rendered", function (event) {
        var widgetFrame = event.target;
        var contentDocument = widgetFrame.contentDocument;

        // injects stylesheet into iframe head.
        addStyleSheet(contentDocument);
        trumpVision(contentDocument);
    });
});

// Applied styling to twitter
function trumpVision(document) {
    var retweets = document.querySelectorAll('.timeline-Tweet-text');
    retweets.forEach(function (node) {
        if (node.parentNode) { // (in)sanity check
            node.style = 'color: ' + getRandomColor();
            node.classList.add("trump-tweet");
        }
    })
}

// Funcion injects stylesheet into document head element.
function addStyleSheet(document) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/trumpvision.css';
    link.media = 'all';
    head.appendChild(link);
}

// Provides random color code
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}