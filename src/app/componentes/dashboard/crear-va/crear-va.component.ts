import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VariedadService, flor } from '../../../SERVICES/variedad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-va',
  templateUrl: './crear-va.component.html',
  styleUrls: ['./crear-va.component.css']
})

export class CrearVaComponent implements OnInit{
	
  form : FormGroup; 
  id = '';
  flores: flor[]=[];

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

        this._snackbar.open("Variedad agregado", "", {
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
    console.log(this.id)
    this.VariedadService.Select(data).subscribe(
		(flores)=>{
			this.flores=flores;
			console.log(this.flores);
			this.form.patchValue({
				descripcion: this.flores[0].descripcion,
				cant_rama: this.flores[0].cant_rama,
				cant_malla: this.flores[0].cant_malla,
				longitud: this.flores[0].longitud,
				dias_util: this.flores[0].dias_util
			})
		},
		 (error) => {
       	 console.error('Error:', error);
      }
      
    );  
    
 }

}


