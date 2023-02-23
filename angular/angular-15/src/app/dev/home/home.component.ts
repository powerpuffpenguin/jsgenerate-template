import { Component } from '@angular/core';
import { aesDecrypt, aesEncrypt } from 'src/internal/aes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  onClickAES() {

    const val = aesEncrypt("ok", "12", "34")
    console.log(val)
    console.log(aesDecrypt(val, "12", "341"))
  }
}
