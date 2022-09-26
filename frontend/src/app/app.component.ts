import { Component , OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  geometricShapes : any;
  triangleBoolean : boolean = true;
  rectangleBoolean : boolean = true;
  circleBoolean : boolean = true;
  squareBoolean : boolean = true;

  rectangleForm = this.formBuilder.group({
    l: '',
    w: ''
  });

  squareForm = this.formBuilder.group({
    l: ''
  });

  triangleForm = this.formBuilder.group({
    a: '',
    b: '',
    c: ''
  });

  circleForm = this.formBuilder.group({
    r: ''
  });


  constructor(private api:ApiService, private formBuilder: FormBuilder,) {

  }

  ngOnInit() {
    this.geometricShapes = [];
    this.api.getGeometricShapes().subscribe((data)=>{
      this.geometricShapes = data;
    });

  }

  clickShape(shape: any){

    switch (shape){
      case 'triangle':
        this.triangleBoolean = false;
        this.rectangleBoolean = true;
        this.squareBoolean = true;
        this.circleBoolean = true;
        break;
      case 'rectangle':
        this.triangleBoolean = true;
        this.rectangleBoolean = false;
        this.squareBoolean = true;
        this.circleBoolean = true;
        break;
      case 'square':
        this.triangleBoolean = true;
        this.rectangleBoolean = true;
        this.squareBoolean = false;
        this.circleBoolean = true;
        break;
      case 'circle':
        this.triangleBoolean = true;
        this.rectangleBoolean = true;
        this.squareBoolean = true;
        this.circleBoolean = false;
        break;

    }
  }

  calcTriangle(){
    alert('you have selected the triangle')
  }

  calcRectangle(){

  }

  calcSquare(){

  }

  calcCircle(){
    alert(this.circleForm.value.r);
  }
}
