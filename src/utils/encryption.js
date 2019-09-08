import JSEncrypt from 'jsencrypt';

/**
 * RSA 加密
 * @param {String} data   待加密数据
 * @returns {String}      加密后的数据
 */
export const rsa = (data) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUBLICKEY);
  return encrypt.encrypt(data);
};
