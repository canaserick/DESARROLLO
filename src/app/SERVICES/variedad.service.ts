import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
 
  Select(data){
        return this.http.post<any>(this.url+'/select', data);
  };

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

