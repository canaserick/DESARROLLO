import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VariedadService } from '../../../SERVICES/variedad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

interface Items {
  id : string,
  descripcion: string,
  longitud:    string,
  cant_rama:   string,
  cant_malla:  string,
  dias_util:   string
}; 

@Component({
  selector: 'app-crear-va',
  templateUrl: './crear-va.component.html',
  styleUrls: ['./crear-va.component.css']
})


export class CrearVaComponent implements OnInit{
  
  form : FormGroup; 
  id = '';
  item: Observable<Items>;

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
    const data = {
      "operacion" : "select",
      "tabla" : "variedad",
      "campos" : [
          { "campo" : "*" }  
      ],
      "condiciones" : [
          {
              "campo" : "id",
              "cond"  : "=",
              "valor" : `${this.id}`,
              "tipo"  : "int"
          }
      ]
    };

    this.VariedadService.Select(data).subscribe(
      {
        next:response=>{
          console.log("Response", response);
          this.item = response;
          console.log("Item", this.item[0].descripcion);
          console.log(this.item);
          this.form.get('descripcion').setValue(this.item[0].descripcion);
          this.form.get('longitud').setValue(this.item[0].longitud);
          this.form.get('cant_rama').setValue(this.item[0].cant_rama);
          this.form.get('cant_malla').setValue(this.item[0].cant_malla);
          this.form.get('dias_util').setValue(this.item[0].dias_util);

        },
        error:error=>console.log(error)
      }  
    )  
 }

}


