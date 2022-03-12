import crypto from 'crypto-js';

//Encriptying to AES using crypto-js
const crypting = {
  sk: import.meta.env.VITE_SK,
  encode(string) {
    return crypto.AES.encrypt(string, this.sk).toString();
  },
  decode(string) {
    const bytes = crypto.AES.decrypt(string, this.sk);
    return bytes.toString(crypto.enc.Utf8);
  },
};

export default crypting;
