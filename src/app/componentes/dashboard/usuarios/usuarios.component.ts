import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator } from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import { VariedadService } from '../../../SERVICES/variedad.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nombre', 'malla', 'longitud'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private VariedadService:VariedadService, private router:Router) {
 
  }

  ngOnInit(): void {
    this.listar();
  } 
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        },
        error:error=>console.log(error)
      }  
    )
  };

}


