const update = (arr, key, newval) => {
  var match = _.find(arr, key);
  if (match) _.merge(match, newval);
  else arr.push(newval);
};
