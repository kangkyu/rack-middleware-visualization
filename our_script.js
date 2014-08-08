function makeNodes() {
    var paper = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    HORIZON = 200; // the y coordinate which gives us the x-axis, e.g. y=200px;
    LINE_ATTRS = {stroke: '#aaa', 'stroke-width': 5};
    NODE_ATTRS = {stroke: '#aaa', 'stroke-width': 2, fill: 'white'};
    NODE_RADIUS = 50;

    function makeLine(start, len) {
        var lparams = ['M', start, HORIZON, 'l', len, 0];
        return paper.path(lparams.join(' ')).attr(LINE_ATTRS);
    };

    function makeCircle(x, y) {
        return paper.circle(x, y, NODE_RADIUS).attr(NODE_ATTRS);
    };

    function segment(start_x) {
        var ARM_LEN = 50;
        var left_l = makeLine(start_x, ARM_LEN);
        var circle_x = start_x + ARM_LEN + NODE_RADIUS;
        var circle = makeCircle(circle_x, HORIZON);
        var right_l = makeLine(start_x + ARM_LEN + NODE_RADIUS*2, ARM_LEN);
        return paper.set(left_l, circle, right_l);
    };

    function animateRequest(){
        var speed = 500;
        var req = paper.circle(0, HORIZON, 5).attr({fill: 'red'});

        function highlightNode(){
            req.attr({'stroke-width': 0});
            redden(node[0].items[1]);
            paper.text(100, HORIZON, "Node 1").attr({"font-size": 12});
        };

        var node1 = Raphael.animation({cx: 100, cy: HORIZON}, speed, highlightNode);
        req.animate(node1);
    };

    function redden(node) {
        node.attr({fill: 'red'});
    };

    function main() {
        for(var i = 0; i < 5; i+=1) {
            node[i] = segment(200*i);
        };
    };

    var node = [];
    main();

    // events
    $('#canvas_container').on("click", animateRequest);

};

$(document).ready(makeNodes);
