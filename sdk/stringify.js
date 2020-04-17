var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  return (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean" ||
    typeof v === "symbol" ||
    typeof v === "bigint"
  );
};

var stringify = function stringify(object, prefix, generateArrayPrefix) {
  let obj = object;

  if (obj === null) {
    obj = "";
  }

  if (isNonNullishPrimitive(obj)) {
    return [`${String(prefix)}=${String(obj)}`];
  }
  let values = [];

  if (typeof obj === "undefined") {
    return values;
  }

  let keys = Object.keys(obj);
  let objKeys = keys;

  for (let i = 0; i < objKeys.length; ++i) {
    let key = objKeys[i];

    if (obj[key] === null) {
      continue;
    }
    pushToArray(values, stringify(obj[key], `${prefix}[${key}]`));
  }
  return values;
};
var queryStringify = function(object) {
  let obj = object;
  let keys = [];
  let objKeys = Object.keys(obj);
  for (let i = 0; i < objKeys.length; ++i) {
    let key = objKeys[i];
    if (obj[key] === null) {
      continue;
    }
    pushToArray(keys, stringify(obj[key], key));
  }
  let joined = keys.join("&");
  let prefix = "";
  return joined.length > 0 ? prefix + joined : "";
};
