/* import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data), 
    SECRET_KEY
  ).toString()
}

export const decryptData = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
 */