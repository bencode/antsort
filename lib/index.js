module.exports = function(list) {
  var guard = {};
  var queue = [];
  // find all no deps item inqueue
  list.forEach(function(item, index) {
    if (!item.before && !item.after) {
      guard[index] = true;
      queue.push(item);
    }
  });

  queue = sortBy(queue, 'level');

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

  return result;
};


function put(list, item) {
  var name = item.before || item.after;
  if (name) {
    var index = indexOf(list, 'name', name);
    if (index === -1) {
      throw new Error('can not find item `' + name + '`');
    }
    if (!item.before) {
      index++;
    }
    list.splice(index, 0, item);
  } else {
    list.push(item);
  }
}


function sortBy(list, field) {
  var copy = list.map(function(value, index) {
    return { value: value, index: index };
  });

  copy.sort(function(left, right) {
    return left.value[field] - right.value[field] ||
        left.index - right.index;
  });

  return copy.map(function(item) {
    return item.value;
  });
}


function indexOf(list, field, value) {
  for (var i = 0, c = list.length; i < c; i++) {
    if (list[field] === value) {
      return i;
    }
  }
  return -1;
}
