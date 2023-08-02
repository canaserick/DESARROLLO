import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VariedadService } from '../../../SERVICES/variedad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-va',
  templateUrl: './crear-va.component.html',
  styleUrls: ['./crear-va.component.css']
})


export class CrearVaComponent implements OnInit{

  form : FormGroup; 
  id = '';

  constructor(private fb:FormBuilder, private VariedadService:VariedadService, 
    private router:Router, private _snackbar:MatSnackBar, private route:ActivatedRoute) {
    this.form = this.fb.group({
        descripcion: ['', Validators.required],
        longitud:    ['', Validators.required],  
        cant_rama:   ['', Validators.required],  
        cant_malla:  ['', Validators.required],  
        dias_util:   ['', Validators.required],  
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != ''){
      this.cargar();
    }
  }

  grabar() {
    const data= {
      "operacion" : "insert",
      "tabla" : "variedad",
      "campos" :  [
          {
              "campo" : "descripcion",
              "valor" : this.form.value.descripcion,
              "tipo"  : "string"
          },
          {
              "campo" : "longitud",
              "valor" : this.form.value.longitud,
              "tipo"  : "int"
          },
          {
              "campo" : "cant_rama",
              "valor" : this.form.value.cant_rama,
              "tipo"  : "int"
          },
          {
              "campo" : "cant_malla",
              "valor" : this.form.value.cant_malla,
              "tipo"  : "int"
          },
          {
              "campo" : "dias_util",
              "valor" : this.form.value.dias_util,
              "tipo"  : "int"
          }
      ]
  }
    console.log(data);
        //ejecuto el servicio
        this.VariedadService.Add(data).subscribe(
          {
            next:response=>{
              if (response == 1) {
                console.log('Grabo, ok');
              } else {
                //Mostramos mensaje de error                
                this.form.reset();
              }
            },
            error:error=>console.log(error)
          }  
        )  

        //vuelvo al listado de variedades
        this.router.navigate(['/dashboard/variedad'])

        this._snackbar.open("Usuario agregado", "", {
          duration:5000,
          horizontalPosition:"center",
          verticalPosition: "bottom"
        })
  }

  salir(){
    //vuelvo al listado de variedades
    this.router.navigate(['/dashboard/variedad'])
 }

 cargar(){
    console.log(this.id)
    this.VariedadService.SelectOne(this.id).subscribe(
      {
        next:response=>{
          if (response == 1) {
            console.log(response);
          } else {
            //Mostramos mensaje de error                
            this.form.reset();
          }
        },
        error:error=>console.log(error)
      }  
    )  
 }

}


