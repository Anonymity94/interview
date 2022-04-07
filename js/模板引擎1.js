/**
 * @see https://gist.github.com/barretlee/7765587
 * @param {String} tpl
 * @param {*} data
 * @returns
 */
const tplEngine = function (tpl, data) {
  const reg = /<%([^%>]+)?%>/g;
  let code = 'var r=[];';
  let cursor = 0;

  // 把 for，if，switch 等语句排除在外
  const regOut = /(for|if|else|switch|case|break|{|})/g;

  /**
   *
   * @param {String} line
   * @param {Boolean} js
   */
  var add = function (line, js) {
    if (js) {
      code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n';
    } else {
      code +=
        line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
    }
  };

  while ((match = reg.exec(tpl))) {
    // match[0]
    // '<% if(!post.expert){ %>'

    // match[1]
    // ' if(!post.expert){ '

    // 添加非逻辑部分
    // 从2个指针中截取
    // cursor 开始位置
    // match.index 结束位置
    add(tpl.slice(cursor, match.index));
    // 添加逻辑部分
    add(match[1], true);
    // 下一个开始遍历的开始
    cursor = match.index + match[0].length;
  }

  // 拼接结尾剩余的语句
  add(tpl.substring(cursor));

  code += 'return r.join("");';
  console.log(code);

  return new Function(code.replace(/[\r\t\n]/g, '')).call(data);
};

var tpl =
  '<% for(var i = 0; i < posts.length; i++) {' +
  'var post = posts[i]; %>' +
  '<% if(!post.expert){ %>' +
  '<span>post is null</span>' +
  '<% } else { %>' +
  '<a href="#"><% post.expert %> at <% post.time %></a>' +
  '<% } %>' +
  '<% } %>';

var data = {
  posts: [
    {
      expert: 'content 1',
      time: 'yesterday',
    },
    {
      expert: 'content 2',
      time: 'today',
    },
    {
      expert: 'content 3',
      time: 'tomorrow',
    },
    {
      expert: '',
      time: 'eee',
    },
  ],
};

document.querySelector('#container').innerHTML = tplEngine(tpl, data);
