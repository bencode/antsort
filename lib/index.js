module.exports = function(list, options) {
  options = options || {};

  var guard = {};
  var queue = [];
  // find all no deps item inqueue
  list.forEach(function(item, index) {
    if (!item.before && !item.after) {
      guard[index] = true;
      queue.push(item);
    }
  });

  queue = sortBy(queue, 'level', options.defaultLevel);

  var result = [];
  var len = list.length;
  while (queue.length) {
    var cur = queue.shift();
    put(result, cur);

    for (var i = 0; i < len; i++) {
      var item = list[i];
      if (!guard[i] &&
          (cur.name === item.before ||
           cur.name === item.after)) {
        guard[i] = true;
        queue.push(item);
      }
    }
  }

  check(list, guard);
  return result;
};


function put(list, item) {
  var name = item.before || item.after;
  if (name) {
    var index = indexOf(list, 'name', name);
    if (!item.before) {
      index++;
    }
    list.splice(index, 0, item);
  } else {
    list.push(item);
  }
}


function sortBy(list, field, defs) {
  defs = typeof defs === 'number' ? defs : Number.MAX_VALUE;
  var toNum = function(v) {
    v = +v;
    return Number.isNaN(v) ? defs : v;
  };

  var copy = list.map(function(value, index) {
    return { value: value, index: index };
  });

  copy.sort(function(left, right) {
    return toNum(left.value[field]) - toNum(right.value[field]) ||
            left.index - right.index;
  });

  return copy.map(function(item) {
    return item.value;
  });
}


function indexOf(list, field, value) {
  for (var i = 0, c = list.length; i < c; i++) {
    if (list[i][field] === value) {
      return i;
    }
  }

  // istanbul ignore next
  throw new Error('should not be here');
}


function check(list, guard) {
  for (var i = 0, c = list.length; i < c; i++) {
    if (!guard[i]) {
      var item = list[i];
      var name = item.before || item.after;
      throw new Error('can not find item `' +
          name + '` for `' + item.name + '`');
    }
  }
}

