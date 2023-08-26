import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VariedadService, flor } from '../../../SERVICES/variedad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
<<<<<<< HEAD
=======

interface Items {
  id : string,
  descripcion: string,
  longitud:    string,
  cant_rama:   string,
  cant_malla:  string,
  dias_util:   string
}; 
>>>>>>> e383ce479e640ad5fdd2608d1a241961d7e031a4

@Component({
  selector: 'app-crear-va',
  templateUrl: './crear-va.component.html',
  styleUrls: ['./crear-va.component.css']
})

export class CrearVaComponent implements OnInit{
<<<<<<< HEAD
	
  form : FormGroup; 
  id = '';
  flores: flor[]=[];
=======
  
  form : FormGroup; 
  id = '';
  item: Observable<Items>;
>>>>>>> e383ce479e640ad5fdd2608d1a241961d7e031a4

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
<<<<<<< HEAD
	 const data = {
=======
    console.log(this.id)
    const data = {
>>>>>>> e383ce479e640ad5fdd2608d1a241961d7e031a4
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
<<<<<<< HEAD
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
    
=======

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
>>>>>>> e383ce479e640ad5fdd2608d1a241961d7e031a4
 }

}


