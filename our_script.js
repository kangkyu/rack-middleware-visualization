window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 1000, 500);

    var ax1 = paper.path("M 0 250 l 900 0").attr({stroke: '#aaa', 'stroke-width': 5});

    for(var i = 0; i < 5; i+=1) {
        paper.circle(200*i+100, 250, 50).attr({stroke: '#aaa', 'stroke-width': 2, fill: 'white'});
    };

    $('#canvas_container').on("click", function(){
        var req = paper.circle(0, 250, 5).attr({fill: 'red'});
        var node1 = Raphael.animation({cx: 100, cy: 250}, 500, function(){
            paper.circle(100, 250, 50).attr({fill: 'red'})
        });
        req.animate(node1);
    });
}
