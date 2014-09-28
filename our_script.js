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
    }
};

function MiddlewareStack() {
    var that = this;  // Create a handle to the current stack
    this.nodes = [];

    this.addNode = function(node) {
        this.nodes.push(node);
    };

    this.draw = function() {
        for(var i = 0; i < 4; i+=1) {
            this.nodes[i].draw();
        }
    };

};

function Animation(paper) {
    var that      = this;  // Create a handle to the current animation
    this.paper = paper;
    this.requestBall = this.paper.circle(0, HORIZON, 5).attr({fill: 'red'});

    this.steps = [];

    this.addStep = function(node) {
        this.steps.push(node);
    };

    this.run = function() {
        for(var i = 0; i < steps.length; i+=1) {
            this.animateRequestBall(steps[i]);
        };
    };

    this.animateRequestBall = function(destination) {
        var centerOfNode = destination.startX + ARM_LEN + NODE_RADIUS;
        var anim = Raphael.animation({cx: centerOfNode, cy: HORIZON}, SPEED, destination.highlightNode);
        requestBall.animate(anim);
    };

/*        if (that.next != null) {
            destination = that.next;
        } else if (that.previous != null) {
            destination = that.previous;
        } else {
            console.log('no where to go');
        }
        console.log('destination should be ' + destination.nodeName);
*/

};

function displayRailsMiddlewareStack() {
    LINE_ATTRS = {stroke: '#aaa', 'stroke-width': 5};
    NODE_ATTRS = {stroke: '#aaa', 'stroke-width': 2, fill: 'white'};
    NODE_RADIUS = 50;
    SPEED = 500;
    HORIZON = 200;
    ARM_LEN = 50;

    var p = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    var middlewares =  new MiddlewareStack();
    var animation1;
    var animation2;

    // Eventually this will be specific for each set of animations.
    // We will add nodes representing each of the middlewares in the stack we are displaying.
    // For now, just make 4 generic nodes to play with while I figure out my API.
    var configureMiddleware = function(middlewares) {
        var middlewares = middlewares;
        for(var i = 0; i < 4; i+=1) {
            // Create new node with paper, nodeName, and startX parameters
            middlewares.addNode(new Node(p, "NODE " + (i+1), 200*i));
        };
        return middlewares;
    }

    animation1 = function() {
        var anim = new Animation(p);
        anim.addStep(middlewares.nodes[1]);
        anim.addStep(middlewares.nodes[2]);
        anim.addStep(middlewares.nodes[3]);
        anim.addStep(middlewares.nodes[2]);
        anim.addStep(middlewares.nodes[1]);
        return anim;
    };

    var runAnimation = function() {
        // CNK can't figure out how to get to animation1 to start running steps
        animation1.run();
    }

    // OK now actually do stuff
    configureMiddleware(middlewares);
    middlewares.draw();
    $('#canvas_container').on("click", runAnimation);
};

$(document).ready(displayRailsMiddlewareStack);
