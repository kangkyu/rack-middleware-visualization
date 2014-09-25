var Node = {
    paper: null, // We must get a Raphael canvas passed into the function
    start_x: 0,
    nname: 'default',
    category: 'default',
    ndescription: 'something',
    previous: null,
    next: null,
    LINE_ATTRS: {stroke: '#aaa', 'stroke-width': 5},
    NODE_ATTRS: {stroke: '#aaa', 'stroke-width': 2, fill: 'white'},
    NODE_RADIUS: 50,

    makeLine: function(start, len) {
        var lparams = ['M', start, HORIZON, 'l', len, 0];
        return this.paper.path(lparams.join(' ')).attr(this.LINE_ATTRS);
    },

    makeCircle: function(x, y) {
        return this.paper.circle(x, y, this.NODE_RADIUS).attr(this.NODE_ATTRS);
    },

    segment: function() {
        var ARM_LEN = 50;
        var left_l = this.makeLine(this.start_x, ARM_LEN);
        var circle_x = this.start_x + ARM_LEN + this.NODE_RADIUS;
        var circle = this.makeCircle(circle_x, HORIZON);
        var right_l = this.makeLine(this.start_x + ARM_LEN + this.NODE_RADIUS*2, ARM_LEN);
        return this.paper.set(left_l, circle, right_l);
    },

    highlightNode: function(){
        request_ball.attr({'stroke-width': 0});
        //redden(node[0].items[1]);
        this.paper.text(this.start_x - 50, HORIZON, this.nname).attr({"font-size": 12});
    },

    animateNext: function() {
        var destination = null;  

        if (this.next != null) {
            console.log('go to next');
            destination = Raphael.animation({cx: this.next.start_x, cy: HORIZON}, speed, this.highlightNode);
            request_ball.animate(destination);
        } else if (this.previous != null) {
            destination = Raphael.animation({cx: this.previous.start_x, cy: HORIZON}, -speed, this.highlightNode);
            request_ball.animate(destination);
        }
    }
};

function makeNodes() {
    var p = new Raphael(document.getElementById('canvas_container'), 1000, 500);

    function main() {
        speed = 500;
        HORIZON = 200;

        request_ball = p.circle(0, HORIZON, 5).attr({fill: 'red'});

        for(var i = 0; i < 4; i+=1) {
            var prev = null;
            if (i > 0) {
                prev = node[i-1];
            }

            node[i] = Object.create(Node, { paper: {value: p},
                                            start_x: {value: 200*i},
                                            previous: {value: prev},
                                            nname: {value: "NODE " + i}
                                        });
            if (i > 0) {
                node[i-1].next = node[i];
            }
            node[i].segment();
        };
    };

    var node = [];
    var i = 0;
    main();
    console.log(node[0]);

    function start() {
        node[i].animateNext();
        i++;
    }

    $('#canvas_container').on("click", start);
};



$(document).ready(makeNodes);
