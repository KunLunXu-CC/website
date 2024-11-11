/**
 * 防抖
 * TODO: 替换为 lodash 中的函数
 *
 * @param {Function} fn  传入函数
 * @param {number} wait  等待时长
 * @returns {Function} 返回被调用函数
 */
export const debounce = (fn: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(fn.bind(null, escape), wait);
  };
};

/**
 * RSA 加密
 *
 * @param {string} data   待加密数据
 * @param {string} publicKey 公钥
 * @returns {string}      加密后的数据
 */
export const rsa = async (data: string, publicKey: string) => {
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(data);
};

/**
 * 获取 url 参数
 *
 * @param {string} key 要获取的指定参数
 * @returns {string|URLSearchParams} 返回 URLSearchParams 对象或者参数值
 */
export const urlParams = (key: string) => {
  const urlSearchParams = new URLSearchParams(location.search);

  if (key) {
    return urlSearchParams.get(key);
  }

  return urlSearchParams;
};
