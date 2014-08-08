function makeNodes() {
    var paper = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    HORIZON = 200; // the y coordinate which gives us the x-axis, e.g. y=250px;
    LINE_ATTRS = {stroke: '#aaa', 'stroke-width': 5};
    NODE_ATTRS = {stroke: '#aaa', 'stroke-width': 2, fill: 'white'};
    NODE_RADIUS = 50;

    function makeLine(len) {
        paper.path("M 0 " + HORIZON + "l "+ len +" 0").attr(LINE_ATTRS);
    };

    function node(x, y) {
        paper.circle(x, y, NODE_RADIUS).attr(NODE_ATTRS);
    };

    function animateRequest(){
        var speed = 500;
        var req = paper.circle(0, HORIZON, 5).attr({fill: 'red'});
        var node1 = Raphael.animation({cx: 100, cy: HORIZON}, speed, function(){
            paper.circle(100, HORIZON, NODE_RADIUS).attr({fill: 'red'});
            paper.text(100, HORIZON, "Node 1").attr({"font-size": 12});
        });
        req.animate(node1);
    };

    function main() {
        makeLine(900);
        for(var i = 0; i < 5; i+=1) {
            node(200*i+100, HORIZON);
        };
    };
    main();

    // events
    $('#canvas_container').on("click", animateRequest);

};

$(document).ready(makeNodes);
