function initPush(arrayName, obj, toPush) {
  if (obj[arrayName] === undefined) {
    obj[arrayName] = [];
  }
  obj[arrayName].push(toPush);
}

function multiInitPush(arrayName, obj, toPushArray) {
  let len = toPushArray.length;
  if (obj[arrayName] === undefined) {
    obj[arrayName] = [];
  }
  while (len-- > 0) {
    obj[arrayName].push(toPushArray.shift());
  }
}

const defaultConfig = {
  id: 'id',
  parent: 'parent',
  children: 'children'
};

export function convert(flat, _config = {}) {
  const config = { ...defaultConfig, ..._config };
  const temp = {};
  const roots = [];
  const pendingChildOf = {};
  let i = 0;
  let len;
  let id;
  let parent;
  let nested;
  let flatEl;

  for (i, len = flat.length; i < len; i += 1) {
    flatEl = flat[i];
    id = flatEl[config.id];
    parent = flatEl[config.parent];
    temp[id] = flatEl;

    if (parent === undefined || parent === null) {
      roots.push(flatEl);
    } else {
      if (temp[parent] !== undefined) {
        initPush(config.children, temp[parent], flatEl);
      } else {
        initPush(parent, pendingChildOf, flatEl);
      }
      delete flatEl[config.parent];
    }

    if (pendingChildOf[id] !== undefined) {
      multiInitPush(config.children, flatEl, pendingChildOf[id]);
    }
  }

  if (roots.length >= 1) {
    nested = {};
    nested[config.children] = roots;
  } else {
    nested = null;
  }

  return nested;
}
