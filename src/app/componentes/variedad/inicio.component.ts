import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VariedadService } from '../../SERVICES/variedad.service';
import { response } from 'express';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{

  constructor(private VariedadService:VariedadService, private router:Router) {}
 
  ngOnInit(): void {
    this.listar();
  }

  crearVariedad(){
   

  }
  
  listar() {
    const data = {
      "operacion" : "select",
      "tabla" : "variedad",
      "campos" : [
          { "campo" : "*" }  
      ],
      "condiciones" : [
          {
              "campo" : "*",
              "cond"  : "=",
              "valor" : "1",
              "tipo"  : "int"
          }
      ]
    };

    this.VariedadService.Select(data).subscribe(
      {
        next:response=>{
          console.log(response);
         
        },
        error:error=>console.log(error)
      }  
    )
  };

  eliminar(id:string) {
    console.log("eliminar")
    this.VariedadService.Delete(id).subscribe(
      {
        next:response =>{
          console.log('Variedad eliminada');
          this.listar();
        },
        error: error =>console.log(error)
      }
    )
  }

  modificar(id:string){
    this.router.navigate(['/edit'+id]);
  }

};


