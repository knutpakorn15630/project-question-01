import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ReqLogin } from 'src/app/interface-api/interface-Login';
import { ServiceApiService } from 'src/app/service/service-api.service';
import { ServiceLoginService } from 'src/app/service/service-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.scss']
})
export class ComponentLoginComponent implements OnInit {

  input = {
    input1: '',
    input2: ''
  };

  message: '';

  constructor(
    private callApi: ServiceApiService,
    private router: Router,
    private serviceLogin: ServiceLoginService,
    private broadcaster: NgBroadcasterService
  ) { }

  ngOnInit(): void {
    this.broadcaster.listen('test-event').subscribe(res => {
      this.message = res.message;
      console.log(`this is a logout ${this.message}`);
    });

    this.serviceLogin.clearLogin();
    const inputs = document.querySelectorAll('.input');
    function addFocus() {
      const parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function removeFocus() {
      const parent = this.parentNode.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', addFocus);
      input.addEventListener('blur', removeFocus);
    });
  }

  login() {
    const body: ReqLogin = {
      userName: this.input.input1,
      password: this.input.input2,
    };
    this.callApi.getLogin(body).subscribe(
      async (res) => {
        let timerInterval;
        Swal.fire({
          title: 'กำลังเข้าสู้ระบบ!',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector('b');
                if (b) {
                  b.textContent = Swal.getTimerLeft().toString();
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        });
        this.broadcaster.emitEvent('token-login', res);
        this.serviceLogin.setLogin(res);
        this.router.navigateByUrl('/dashboard/form');
      },
      (err) => {
        console.log(`login err ${err}`);
        Swal.fire({
          icon: 'warning',
          title: 'รหัสผ่านไม่ถูกต้อง',
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      },
    );
  }

}
