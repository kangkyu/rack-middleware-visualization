function Node(paper, nodeName, startX) {
    var that      = this;  // Create a handle to the current node
    this.paper    = paper; // Raphael canvas on which this node is drawn
    this.nodeName = nodeName;
    this.startX   = startX;
    this.category = 'default';
    this.description = 'description text';
    this.previous = null;
    this.next     = null;
    this.circle   = null; // We will need access to the circle portion of the node so we can highlight it

    this.makeLine = function(start, len) {
        var lparams = ['M', start, HORIZON, 'l', len, 0];
        return this.paper.path(lparams.join(' ')).attr(LINE_ATTRS);
    }

    this.makeCircle = function(x, y) {
        return this.paper.circle(x, y, NODE_RADIUS).attr(NODE_ATTRS);
    }

    this.draw = function() {
        var left_l = this.makeLine(this.startX, ARM_LEN);
        var circle_x = this.startX + ARM_LEN + NODE_RADIUS;
        this.circle = this.makeCircle(circle_x, HORIZON);
        var right_l = this.makeLine(this.startX + ARM_LEN + NODE_RADIUS*2, ARM_LEN);
        return this.paper.set(left_l, this.circle, right_l);
    }

    this.highlightNode = function() {
        console.log(that);
        that.circle.attr({fill: 'red'});
        this.paper.text(that.startX + ARM_LEN + NODE_RADIUS, HORIZON, that.nodeName).attr({"font-size": 12});
        if (that.next != null) {
            destination = that.next;
        } else if (that.previous != null) {
            destination = that.previous;
        } else {
            console.log('no where to go');
        }
        console.log('destination should be ' + destination.nodeName);
    }
};

function createAnimation() {
    LINE_ATTRS = {stroke: '#aaa', 'stroke-width': 5};
    NODE_ATTRS = {stroke: '#aaa', 'stroke-width': 2, fill: 'white'};
    NODE_RADIUS = 50;
    SPEED = 500;
    HORIZON = 200;
    ARM_LEN = 50;

    var p = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    var requestBall = p.circle(0, HORIZON, 5).attr({fill: 'red'});

    function makeNodes() {
        for(var i = 0; i < 4; i+=1) {
            // Create new node with paper, nodeName, and startX parameters
            node[i] = new Node(p, "NODE " + (i+1), 200*i);  // cheat and display nodes as if we started counting arrays at 1
            // If this isn't the first node, set it's previous attribute to previous node
            if (i > 0) { node[i].previous = node[i-1]; }
            // And update previous node to know this node as 'next'
            if (i > 0) { node[i-1].next = node[i]; }
            node[i].draw();
        };
    };

    function animateRequestBall(destination) {
        var centerOfNode = destination.startX + ARM_LEN + NODE_RADIUS;
        var anim = Raphael.animation({cx: centerOfNode, cy: HORIZON}, SPEED, destination.highlightNode);
        requestBall.animate(anim);
    }

    var node = [];
    makeNodes();
    destination = node[0];

    function move() {
        animateRequestBall(destination);
    }

    $('#canvas_container').on("click", move);
};

$(document).ready(createAnimation);
