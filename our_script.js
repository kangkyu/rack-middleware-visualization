var Node = {
    nname: 'default',
    category: 'default',
    ndescription: 'something',
    color: function() {
        return 'tangerine';
    }
};

var first = Object.create(Node, {
    nname: { value: 'first node' },
    category: { value: 'filter' }
});

var second = Object.create(Node, {nname: {value: 'second node'}})

console.log(first);
console.log(second);

