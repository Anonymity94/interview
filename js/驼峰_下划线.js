/**
 * 驼峰转下划线
 */
export const snakeCase = (value) =>
  value.replace(/([A-Z])/g, '_$1').toLowerCase();

/**
 * 下划线转驼峰
 */
export const camelCase = (value) => {
  const t = value.replace(/\_(\w)/g, (_value, letter) => {
    return letter.toUpperCase();
  });
  return t;
};
