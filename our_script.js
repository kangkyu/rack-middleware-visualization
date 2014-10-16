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
        console.log('in highlightNode for node ' + that);
        // that.circle.attr({fill: 'red'});
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

function Animation(paper, name) {
    var that      = this;  // Create a handle to the current animation
    console.log('created a new Animation object');
    this.paper = paper;
    this.requestBall = this.paper.circle(0, HORIZON, 5).attr({fill: 'green'});
    this.name = name;

    this.steps = [];

    this.addStep = function(node) {
        this.steps.push(node);
    };

    this.run = function(step) {
        console.log(this.steps, step)
        this.animateRequestBall(this.steps[step]);
    };

    this.animateRequestBall = function(destination) {

        console.log('in animate destination is ' + destination);
        var centerOfNode = destination.startX + ARM_LEN + NODE_RADIUS;
        console.log(centerOfNode);
        var anim = Raphael.animation({cx: centerOfNode, cy: HORIZON}, SPEED, destination.highlightNode);
        this.requestBall.animate(anim);
        destination = this.steps[step++];
    };
};

function displayRailsMiddlewareStack() {
    LINE_ATTRS = {stroke: '#aaa', 'stroke-width': 5};
    NODE_ATTRS = {stroke: '#aaa', 'stroke-width': 2, fill: 'white'};
    NODE_RADIUS = 50;
    SPEED = 2000;
    HORIZON = 200;
    ARM_LEN = 50;

    var p = new Raphael(document.getElementById('canvas_container'), 1000, 500);
    var middlewares =  new MiddlewareStack();
    // global because it is initalized here but incremented in the animation.
    step = 0;

    // Eventually this will be specific for each set of animations.
    // We will add nodes representing each of the middlewares in the stack we are displaying.
    // For now, just make 4 generic nodes to play with while I figure out my API.
    var configureMiddleware = function(middlewares) {
        console.log("configureMiddleware", middlewares)
        var middlewares = middlewares;
        for(var i = 0; i < 4; i+=1) {
            // Create new node with paper, nodeName, and startX parameters
            middlewares.addNode(new Node(p, "NODE " + (i+1), 200*i));
        };
        return middlewares;
    }

    // For each middleware stack, we will provide sets of animations
    animation1 = function() {
        var anim = new Animation(p, 'First Animation');
        console.log("animation1", middlewares.nodes)
        anim.addStep(middlewares.nodes[0]);
        anim.addStep(middlewares.nodes[1]);
        anim.addStep(middlewares.nodes[2]);
        anim.addStep(middlewares.nodes[1]);
        anim.addStep(middlewares.nodes[0]);
        return anim;
    };

    configureMiddleware(middlewares);
    var ourAnimation = animation1();
    var runAnimation = function() {
        ourAnimation.run(step);
    }

    // OK now actually do stuff
    
    console.debug("middlewares before draw", middlewares)
    middlewares.draw();
    $('#canvas_container').on("click", runAnimation);
};

$(document).ready(displayRailsMiddlewareStack);
