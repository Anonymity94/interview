class VElement {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }

  render() {
    let element = document.createElement(this.tagName);
    let attributes = this.attributes;

    // 比较属性
    for (let key in attributes) {
      setAttribute(element, key, attributes[key]);
    }

    let children = this.children;
    children.forEach((child) => {
      let childElement =
        // 如果 child 也是虚拟节点，继续递归
        child instanceof VElement
          ? child.render()
          : // 如果是字符串，直接创建文本节点
            document.createTextNode(child);

      // 插入到 node 中
      element.appendChild(childElement);
    });

    return element;
  }
}

function element(tagName, attributes, children) {
  return new VElement(tagName, attributes, children);
}

function renderDom(element, target) {
  target.appendChild(element);
}

const setAttribute = (node, key, value) => {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      let tagName = node.tagName || '';
      tagName = tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        // 如果节点不是 input 或 textarea，直接使用 setAttribute
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
};

// const chapterListVDom = element('ul', { id: 'list' }, [
//   element('li', { class: 'chapter' }, ['chapter1']),
//   element('li', { class: 'chapter' }, ['chapter2']),
//   element('li', { class: 'chapter' }, ['chapter3']),
// ]);
// console.log(chapterListVDom);
// const dom = chapterListVDom.render();
// console.log(dom);
