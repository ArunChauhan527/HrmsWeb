import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  secretKey: string= environment.key;
  constructor() { }

  encrypt(value :string) : string
  {
    
    let _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secretKey);

   return CryptoJS.AES.encrypt(value,_key,{
     keySize : 16,
     iv : _iv,
     mode : CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7,
   }).toString();
  }

  decrypt(value : string): string
  {
    let _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    return CryptoJS.AES.decrypt(value,_key,{
     keySize : 16,
     iv : _iv,
     mode : CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7,
   }).toString(CryptoJS.enc.Utf8);
  }

}
