// From the tutorial http://code.tutsplus.com/tutorials/an-introduction-to-the-raphael-js-library--net-7186

window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    // load helper to allow us to send an element down a path
    paper.addGuides();
    var ax1 = paper.path("M 0 240 l 900 0").attr({stroke: '#aaa', 'stroke-width': 5});
    var ax2 = paper.path("M 0 260 l 900 0").attr({stroke: '#0aa', 'stroke-width': 5});
    for(var i = 0; i < 5; i+=1) {
        paper.circle(200*i+100, 250, 50).attr({stroke: '#aaa', 'stroke-width': 2, fill: 'white'});
    };

    $('#canvas_container').on("click", function(){
        var req = paper.circle(0, 0, 5).attr({fill: 'red'});
        req.attr({guide : ax1, along : 0})
        .animate({along: 0.2}, 2000, "linear");
    });
}
