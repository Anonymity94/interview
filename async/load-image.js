// 依次请求图片进行加载
const loadImg = (urlId) => {
  const url = `https://www.image.com/${urlId}`;
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(urlId);
    };
    img.onerror = () => {
      reject(urlId);
    };

    img.src = url;
  });
};

const urlIds = [1, 2, 3, 4];

urlIds.reduce((prevPromise, urlId) => {
  return prevPromise.then((url) => loadImg(urlId));
}, Promise.resolve());
