const diff = (oldVDom, newVDom) => {
  let patches = {};
  walkToDiff(oldVDom, newVDom, 0, patches);
  console.log(patches);
  return patches;
};

let initialIndex = 0;
/**
 *
 * @param {*} oldVDom 老的 vdom
 * @param {*} newVDom 新的 vdom
 * @param {*} index nodeIndex
 * @param {*} patches 对比结果
 */
const walkToDiff = (oldVDom, newVDom, index, patches) => {
  let diffResult = [];

  // 新的 vdom 不存在，说明该节点已经删除
  if (!newVDom) {
    diffResult.push({
      type: 'REMOVE',
      index,
    });
  }
  // 新旧节点都是字符串，直接比较文本
  else if (typeof oldVDom === 'string' && typeof newVDom === 'string') {
    // 对比文本是否相同
    if (oldVDom !== newVDom) {
      diffResult.push({
        type: 'MODIFT_TEXT',
        data: newVDom,
        index,
      });
    }
  }
  // 判断类型是否一致
  else if (oldVDom.tagName === newVDom.tagName) {
    // 比较属性
    let diffAttributeResult = {};
    for (let key in oldVDom) {
      if (oldVDom[key] !== newVDom[key]) {
        diffAttributeResult[key] = newVDom[key];
      }
    }

    // 获取新增的属性
    for (let key in newVDom) {
      if (!oldVDom.hasOwnProperty(key)) {
        diffAttributeResult[key] = newVDom[key];
      }
    }

    if (Object.keys(diffAttributeResult).length) {
      diffResult.push({
        type: 'MODIFY_ATTRIBUTES',
        diffAttributeResult,
      });
    }

    // 如果存在子节点，继续遍历
    oldVDom.children.forEach((child, index) => {
      walkToDiff(child, newVDom.children[index], ++initialIndex, patches);
    });
  }

  // 节点类型不一样，直接替换掉
  else {
    diffResult.push({
      type: 'REPLACE',
      newVDom,
    });
  }

  // 如果老的 vdom 不存在，说明的新建
  if (!oldVDom) {
    diffResult.push({
      type: 'REPLACE',
      newVDom,
    });
  }

  if (diffResult.length) {
    patches[index] = diffResult;
  }
};

/**
 *
 * @param {*} node 真实的 dom 节点
 * @param {*} patches 最小化差异集合
 */
const patch = (node, patches) => {
  let walker = { index: 0 };
  walk(node, walker, patches);
};

const walk = (node, walker, patches) => {
  let currentPatch = patches[walker.index];
  let childNodes = node.childNodes;

  childNodes.forEach((child) => {
    walker.index++;
    walk(child, walker, patches);
  });

  if (currentPatch) {
    doPatch(node, currentPatch);
  }
};

const doPatch = (node, patches) => {
  patches.forEach((patch) => {
    switch (patch.type) {
      case 'MODIFY_ATTRIBUTES':
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        // 1: 元素节点
        if (node.nodeType !== 1) {
          return;
        }

        const attributes = patch.diffAttributeResult.attributes;
        for (let key in attributes) {
          const value = attributes[key];
          if (value) {
            // 有属性内容，就设置
            setAttribute(node, key, value);
          } else {
            // 没有属性值就删除
            node.removeAttribute(key);
          }
        }
        break;
      case 'MODIFT_TEXT':
        node.textContent = patch.data;
        break;

      case 'REPLACE':
        let newNode =
          patch.newVDom instanceof VElement
            ? patch.newVDom.render()
            : document.createTextNode(patch.newVDom);
        node.parentNode.replaceChild(newNode, node);
        break;

      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  });
};
