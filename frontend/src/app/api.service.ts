import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (private http:HttpClient) {}

  getGeometricShapes(){
    return this.http.get('http://127.0.0.1:8000/api/shapes');
  }

  getGeometricUnits(){
    return this.http.get('http://127.0.0.1:8000/api/units');
  }

  calcGeometricFigure(data: any, figure: string){
    return this.http.post('http://127.0.0.1:8000/api/'+figure+'/calc', data);
  }

}
