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
        observe(contentDocument);
    });
});

// Applied styling to twitter
function trumpVision(document) {
    var retweets = document.querySelectorAll('.timeline-Tweet-text');
    retweets.forEach(function (node) {
        makeElementTrumpAgain(node);
    })
}

// Funcion injects stylesheet into document head element.
function addStyleSheet(document) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.jsdelivr.net/gh/ErvinsS/maketrumpjsagain@latest/css/trumpvision.css';
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

function makeElementTrumpAgain(element) {
    element.style = 'color: ' + getRandomColor();
    element.classList.add("trump-tweet");
}

function observe(document) {
    var targetNode = document.getElementsByClassName("timeline-TweetList");
    var config = { childList: true };

    // Callback function to execute when mutations are observed
    var callback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            console.log(mutation);
            if (mutation.type == 'childList') {
                for(var element of mutation.addedNodes){
                    var ps = element.querySelectorAll("p.timeline-Tweet-text");
                    for (var p of ps){
                        makeElementTrumpAgain(p);
                    }
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode[0], config);
}