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
        name: 'o',
        level: 3
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

    sorted.map(item => item.name)
        .should.be.eql(['c', 'n', 'm', 'd', 'e',
            'b', 'a', 'h', 'k', 'o', 'f', 'g']);
  });


  it('should work with default level', function() {
    var list = [
      {
        name: 'a',
        level: 1
      },

      {
        name: 'b'  // will be last
      },

      {
        name: 'c',
        level: 1
      }
    ];

    sort(list).map(item => item.name)
        .should.be.eql(['a', 'c', 'b']);

    sort(list, { defaultLevel: 0 }).map(item => item.name)
        .should.be.eql(['b', 'a', 'c']);
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

    (() => sort(list))
        .should.throw(/can not find item `c`/);


    list = [
      {
        name: 'a'
      },

      {
        name: 'b',
        after: 'c'
      }
    ];

    (() => sort(list))
        .should.throw();
  });


  it('readme case', function() {
    var list = [
      {
        name: 'a',
        level: 3
      },

      {
        name: 'b',
        level: 4
      },

      {
        name: 'c',
        before: 'b'
      },

      {
        name: 'd',
        level: 3
      },

      {
        name: 'e',
        after: 'a'
      }
    ];


    var sorted = sort(list);
    sorted.map(item => item.name)
        .should.be.eql(['a', 'e', 'd', 'c', 'b']);
  });
});
