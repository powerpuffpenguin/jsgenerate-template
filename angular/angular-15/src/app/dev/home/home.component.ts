import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { aesDecrypt, aesEncrypt } from 'src/internal/aes';
import { getItem } from 'src/internal/aes-local-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService],
})
export class HomeComponent {
  constructor(
    private confirmationService: ConfirmationService
  ) { }
  onClickAES() {
    const v = getItem("test")
    console.log(v)
    const val = aesEncrypt("ok", "12", "34")
    console.log(val)
    console.log(aesDecrypt(val, "12", "34"))
  }
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
}
