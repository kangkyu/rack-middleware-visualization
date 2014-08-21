var Node = {
    paper: null, // We must get a Raphael canvas passed into the function
    start_x: 0,
    nname: 'default',
    category: 'default',
    ndescription: 'something',
    HORIZON: 200, // the y coordinate which gives us the x-axis, e.g. y=200px;
    LINE_ATTRS: {stroke: '#aaa', 'stroke-width': 5},
    NODE_ATTRS: {stroke: '#aaa', 'stroke-width': 2, fill: 'white'},
    NODE_RADIUS: 50,

    makeLine: function(start, len) {
        var lparams = ['M', start, this.HORIZON, 'l', len, 0];
        return this.paper.path(lparams.join(' ')).attr(this.LINE_ATTRS);
    },

    makeCircle: function(x, y) {
        return this.paper.circle(x, y, this.NODE_RADIUS).attr(this.NODE_ATTRS);
    },

    segment: function() {
        var ARM_LEN = 50;
        var left_l = this.makeLine(this.start_x, ARM_LEN);
        var circle_x = this.start_x + ARM_LEN + this.NODE_RADIUS;
        var circle = this.makeCircle(circle_x, this.HORIZON);
        var right_l = this.makeLine(this.start_x + ARM_LEN + this.NODE_RADIUS*2, ARM_LEN);
        return this.paper.set(left_l, circle, right_l);
    }
};

function makeNodes() {
    var p = new Raphael(document.getElementById('canvas_container'), 1000, 500);

    function main() {
        for(var i = 0; i < 4; i+=1) {
            node[i] = Object.create(Node, { paper: {value: p},
                                            start_x: {value: 200*i}
                                        });
            node[i].segment();
        };
    };

    var node = [];
    main();
    console.log(node);
};

$(document).ready(makeNodes);
