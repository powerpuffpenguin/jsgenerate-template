import { Component } from '@angular/core';
import { aesDecrypt, aesEncrypt } from 'src/internal/aes';
import { getItem } from 'src/internal/aes-local-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  onClickAES() {
    const v = getItem("test")
    console.log(v)
    const val = aesEncrypt("ok", "12", "34")
    console.log(val)
    console.log(aesDecrypt(val, "12", "34"))
  }
}
