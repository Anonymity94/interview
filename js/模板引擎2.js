/**
 * 模板引擎
 * @param {String} tpl
 * @returns
 */
const template = function (tpl, data) {
  let str = "var p=[];with(obj){p.push('";
  str += tpl
    // 先替换所有的换行符
    // .replace(/[\r\n\t]/g, '')
    // .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    // .replace(/<%/g, "');")
    // .replace(/%>/g, "p.push('");

    .replace(/[\r\t\n]/g, '')
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g, "p.push('");

  str += "');}return p.join('');";

  console.log(str);

  var fn = new Function('obj', str.replace(/[\r\t\n]/g, ''));
  return fn.call(null, data);
};

// var p = [];
// with (obj) {
//   p.push('');
//   for (var i = 0; i < users.length; i++) {
//     p.push('  <li>      <a href="');
//     p.push(users[i].url);
//     p.push('">          ');
//     p.push(users[i].name);
//     p.push('      </a>  </li>');
//   }
//   p.push('');
// }
// return p.join('');

var tpl =
  '<%for ( var i = 0; i < users.length; i++ ) { %>' +
  '  <li>' +
  '      <a href="<%=users[i].url%>">' +
  '          <%=users[i].name%>' +
  '      </a>' +
  '  </li>' +
  '<% } %>';

var data = {
  users: [
    { name: 'Byron', url: 'http://localhost' },
    { name: 'Casper', url: 'http://localhost' },
    { name: 'Frank', url: 'http://localhost' },
  ],
};

document.querySelector('#container').innerHTML = template(tpl, data);
