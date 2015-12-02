var sort = require('..');


describe('antsort', function() {
  it('sort with level', function() {
    var list = [
      {
        name: 'b',
        level: 3
      },

      {
        name: 'a',
        level: 3
      },

      {
        name: 'c',
        level: 1
      },

      {
        name: 'd',
        level: 1
      },

      {
        name: 'e',
        level: 2
      },

      {
        name: 'f',
        level: 4
      },

      {
        name: 'g',
        level: 4
      }
    ];


    var sorted = sort(list);

    list.should.not.equal(sorted);

    sorted.map(function(item) {
      return item.name;
    }).should.be.eql(['c', 'd', 'e', 'b', 'a', 'f', 'g']);
  });
});
