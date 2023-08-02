import { Component, OnInit } from '@angular/core';
import {VariedadService} from '../../SERVICES/variedad.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit{
  
  constructor(private VariedadService:VariedadService) {}
  
  ngOnInit(): void {
    this.listarVariedad();
  }

  listarVariedad() {
    const data = "*"
    this.VariedadService.Select(data).subscribe(
      {
        next:response=>console.log(response),
        error:error=>console.log(error)
      }  
    )
  }

};



