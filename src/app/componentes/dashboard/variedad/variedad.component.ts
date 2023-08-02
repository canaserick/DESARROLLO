import { Component, OnInit } from '@angular/core';
import { VariedadService } from '../../../SERVICES/variedad.service';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-variedad',
  templateUrl: './variedad.component.html',
  styleUrls: ['./variedad.component.css'],
})
export class VariedadComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'crama', 'cmalla', 'longitud', 'dias','acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private VariedadService:VariedadService, private router:Router) {
 
  }

  ngOnInit(): void {
    this.listar();
  } 

  ngAfterViewInit() {
    this.dataSource.paginator != this.paginator;
    this.dataSource.sort != this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        next : response  => {
          console.log(response);
          //this.laVariedad=<any>response;
          this.dataSource = new MatTableDataSource(response);
          this.paginator.length = this.dataSource.data.length;
        },
        error:error=>console.log(error)
      }  
    )
  };

  eliminar(id) {
    console.log("hola", id);
    this.VariedadService.Delete(id).subscribe(
      {
        next : response => {
          console.log("eliminado", id);
          this.listar();
        },
        error:error => console.log(error)
      }
    )
  }

  abrir(id){
    //voy al detalle
    this.router.navigate(['/dashboard/crear-variedad', id])
  }

}
