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
  errorMessage: string = '';
  errorStatus: boolean = false;
  successStatus: boolean = false;
  calculatedData : any;

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
    this.errorStatus = false;
    this.successStatus = false;
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

  calcTriangle(shape:string){
    this.api.calcGeometricFigure({ a : Number(this.triangleForm.value.a), b : Number(this.triangleForm.value.b), c : Number(this.triangleForm.value.c )}, shape ).subscribe((data)=>{
      this.errorStatus = false;
      this.successStatus = true;
      this.calculatedData = data;

    },(error => {
      this.errorMessage = error.error;
      this.errorStatus = true;
      this.successStatus = false;

    }));
  }

  calcRectangle(shape:string){
    this.api.calcGeometricFigure({ l : Number(this.rectangleForm.value.l), w : Number(this.rectangleForm.value.w)}, shape ).subscribe((data)=>{
      this.errorStatus = false;
      this.successStatus = true;
      this.calculatedData = data;

    },(error => {
      this.errorMessage = error.error;
      this.errorStatus = true;

    }));
  }



  calcSquare(shape: string){
    this.api.calcGeometricFigure({ l : Number(this.squareForm.value.l), w : Number(this.squareForm.value.l)}, shape ).subscribe((data)=>{
      this.errorStatus = false;
      this.successStatus = true;
      this.calculatedData = data;

    },(error => {
      this.errorMessage = error.error;
      this.errorStatus = true;

    }));
  }

  calcCircle(shape:string){
    this.api.calcGeometricFigure({ r : Number(this.circleForm.value.r)}, shape ).subscribe((data)=>{
      this.errorStatus = false;
      this.successStatus = true;
      this.calculatedData = data;

    },(error => {
      this.errorMessage = error.error;
      this.errorStatus = true;

    }));
  }
}
