import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReqCreateUser, ReqUpdateUser, ResUser } from 'src/app/interface-api/interface-user';
import { ServiceApiService } from 'src/app/service/service-api.service';
import { ServiceLoginService } from 'src/app/service/service-login.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-component-admin',
  templateUrl: './component-admin.component.html',
  styleUrls: ['./component-admin.component.scss']
})
export class ComponentAdminComponent implements OnInit {

  DataUser: ResUser;

  ngMember = {
    name: '',
    lastName: '',
    user: '',
    pass: '',
  };
  isCheck = false;

  ngUpdate = {
    id: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: ''
  };

  testPassWord = '';

  CheckRed = true;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  constructor(
    private callApi: ServiceApiService,
    private router: Router,
    private serviceLogin: ServiceLoginService
  ) { }

  ngOnInit(): void {
    this.GetUser();
  }

  hideModal2() {
    this.isCheck = false;
    $('#Update').modal('hide');
    this.DataNull();
  }

  openLg() {
    $('#content').modal('show');
  }

  hideModal() {
    $('#content').modal('hide');
    this.EmptyData();
    this.isCheck = false;
  }

  EmptyData() {
    this.ngMember = {
      name: '',
      lastName: '',
      user: '',
      pass: '',
    };
  }


  DataNull() {
    this.ngUpdate = {
      id: '',
      password: '',
      firstName: '',
      lastName: '',
      userName: ''
    };
  }

  createUer() {
    const body: ReqCreateUser = {
      firstName: this.ngMember.name,
      lastName: this.ngMember.lastName,
      userName: this.ngMember.user,
      password: this.ngMember.pass
    };
    if (!this.ngMember.name || !this.ngMember.lastName || !this.ngMember.pass || !this.ngMember.user) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      this.isCheck = true;
      return;
    } else {
      this.isCheck = false;
      this.callApi.CreateUser(body).subscribe(
        (res) => {
          this.GetUser();
          this.hideModal();
        },
        (err) => {
          Swal.fire({
            icon: 'warning',
            title: 'Username นี้ถูกใช้งานไปแล้ว กรุณณาตั้ง username!',
            showConfirmButton: false,
            timer: 2000
          });
          console.log(err);
        }
      );
    }
  }

  GetUser() {
    this.callApi.showUser().subscribe(
      (res) => {
        this.DataUser = res;
        console.log(`is User ${this.DataUser}`);
      }
    );
  }

  UpdateData(id: number) {
    const Result = this.DataUser.data.find((x) => x.id === id);
    if (!Result) {
      return;
    }
    this.ngUpdate = {
      id: Result.id.toString(),
      password: Result.password,
      firstName: Result.firstName,
      lastName: Result.lastName,
      userName: Result.userName,
    };
    $('#Update').modal('show');
  }

  updateUser() {
    const body: ReqUpdateUser = {
      id: Number(this.ngUpdate.id),
      password: this.testPassWord,
      firstName: this.ngUpdate.firstName,
      lastName: this.ngUpdate.lastName,
      userName: this.ngUpdate.userName
    };

    if (!this.ngUpdate.firstName || !this.ngUpdate.lastName || !this.testPassWord) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1000
      });
      this.isCheck = true;
      return;
    }

    this.callApi.UpdateUser(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขเรียบร้อยแล้ว'
        });
        this.GetUser();
        this.hideModal2();
        this.isCheck = false;
        this.testPassWord = '';
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'รหัสผ่านไม่ถูกต้อง!',
          showConfirmButton: false,
          timer: 1000
        });
        console.log(err);
      }
    );
  }



}
