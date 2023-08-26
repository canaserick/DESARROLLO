import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class flor{
	id: number;
	descripcion: string;
	longitud: number;
	cant_rama: number;
	cant_malla: number;
	dias_util: number;
}


@Injectable({
  providedIn: 'root'
})
export class VariedadService {

  // ruta del api - rest
  url = 'http://localhost:3000'; 
  constructor(private http: HttpClient) { };
 
 Login(data){
    return this.http.post<any>(this.url+'/login', data);
 }
 
  Select(data): Observable<flor[]>{
        return this.http.post<any[]>(this.url+'/select', data).pipe(
			map((response: any[])=>{
				return response.map((Flor)=>{
					const mappedFlor: flor={
						id: Flor.id,
						descripcion: Flor.descripcion,
						longitud: Flor.longitud,
						cant_rama: Flor.cant_rama,
						cant_malla: Flor.cant_malla,
						dias_util: Flor.dias_util
					};
					return mappedFlor;
				});
			})
		);
  }

  SelectOne(id:string){
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
              "valor" : `${id}`,
              "tipo"  : "int"
          }
      ]
    }
    return this.http.post(this.url+'/select', data);
  };

  Add(data){
    return this.http.post(this.url+'/insert', data);
  };

  Delete(id:string){
    const data = {
      "operacion" : "delete",
      "tabla" : "variedad",
      "campos" : [
          { "campo" : "*" }  
      ],
      "condiciones" : [
          {
              "campo" : "id",
              "cond"  : "=",
              "valor" : `"${id}"`,
              "tipo"  : "int"
          }
      ]
    };
    
    return this.http.post(this.url+'/delete', data);
  }

  Edit(id:string, data){
    return this.http.post(this.url+'/'+id, data);
  }

}

