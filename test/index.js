var sort = require('..');


describe('antsort', function() {
  it('should sort items by level, before and after', function() {
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
        name: 'h',
        before: 'k'
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
      },

      {
        name: 'k',
        after: 'a'
      },

      {
        name: 'm',
        after: 'n'
      },

      {
        name: 'n',
        after: 'c'
      }
    ];


    var sorted = sort(list);

    list.should.not.equal(sorted);

    sorted.map(byName)
        .should.be.eql(['c', 'n', 'm', 'd', 'e', 'b', 'a', 'h', 'k', 'f', 'g']);
  });


  it('should preserve index when item not have level', function() {
    var list = [
      {
        name: 'a',
        level: 1
      },

      {
        name: 'b'
      },

      {
        name: 'c',
        level: 1
      }
    ];

    sort(list).map(byName)
        .should.be.eql(['a', 'b', 'c']);
  });


  it('should throw error when item not found', function() {
    var list = [
      {
        name: 'a'
      },

      {
        name: 'b',
        before: 'c'
      }
    ];

    (function() {
      sort(list);
    }).should.throw(/can not find item `c`/);


    list = [
      {
        name: 'a'
      },

      {
        name: 'b',
        after: 'c'
      }
    ];

    (function() {
      sort(list);
    }).should.throw();
  });
});


function byName(item) {
  return item.name;
}

