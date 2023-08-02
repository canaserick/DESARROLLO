import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { VariedadService } from '../../SERVICES/variedad.service';
import { response } from 'express';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder, private VariedadService:VariedadService, private router:Router, private _snackBar: MatSnackBar){ 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  
  ngOnInit(): void{

  }

  ingresar(){
     //encripto usuario y password - comentado por el momento
    //const encryptedUsername = CryptoJS.AES.encrypt(this.form.value.usuario, 'secret-key').toString();
    //const encryptedPassword = CryptoJS.AES.encrypt(this.form.value.password, 'secret-key').toString();

    const encryptedUsername = this.form.value.usuario
    const encryptedPassword = this.form.value.password
    
    //armo el json a enviar
    const data = {
      login : encryptedUsername,
      passwd : encryptedPassword
    }
    
    //ejecuto el servicio
    this.VariedadService.Login(data).subscribe(
      {
        next:response=>{
          if (response == 1) {
            //Redireccionamos al dashboard
            console.log('antes del loading');
            this.Loading();
            console.log('despues del loading');
          } else {
            //Mostramos mensaje de error
            this.error();
            this.form.reset();
          }
        },
        error:error=>console.log(error)
      }  
    )  
  }

  error(){
    this._snackBar.open("Usuario o Contraseña Incorrecta", "", {
      duration:5000,
      horizontalPosition:"center",
      verticalPosition: "bottom"
    })
  }

  Loading(){
    this.loading = true;
    setTimeout(() =>{
      this.router.navigate(['dashboard']);
    }, 1000); 
  }
}
