import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-matrix',
  templateUrl: './input-matrix.component.html',
  styleUrls: ['./input-matrix.component.css']
})

export class InputMatrixComponent implements OnInit {
  public names: String[];
  public nVariables: number = 1;
  public nRestricciones: number = 1;
  public results: any = {};
  

  constructor() {


    var hn, fieldn;
    for (var i = 0; i < this.nVariables; i++) {
      hn = 'X' + (i + 1).toString()
      fieldn = 'x' + (i + 1).toString()
      var col = { headerName: hn, field: fieldn, editable: true };
      this.columnDefs.push(col);

    }
    var fcol = { headerName: 'LD', field: 'ld', editable: true };
    this.columnDefs.push(fcol);

    for (var i = 0; i < this.nRestricciones; i++) {
      var newRow = {}

      for (const key of this.columnDefs) {
        newRow[key.field] = i;
      }

      this.rowData.push(newRow);
    }

  }
  columnDefs = [];

  rowData = [];

  ngOnInit() {
  }

  createSolutionTable() {
    var hn, fieldn;
    this.columnDefs = []
    this.rowData = []


    var scol = { headerName: 'Z', field: 'z', width: 100, editable: true };
    this.columnDefs.push(scol);

    for (var i = 0; i < this.nVariables + this.nRestricciones; i++) {
      hn = 'X' + i.toString()
      fieldn = 'x' + i.toString()
      var col = { headerName: hn, field: fieldn, width: 100, editable: true };
      this.columnDefs.push(col);

    }

    var fcol = { headerName: 'LD', field: 'ld', width: 100, editable: true };
    this.columnDefs.push(fcol);

    for (var i = 0; i <= this.nRestricciones; i++) {
      var newRow = {}

      for (const key of this.columnDefs) {
        newRow[key.field] = 0
      }
      this.rowData.push(newRow);
    }
  }


  findColPiv(matrix) {
    var pos;
    var mayor = 0;

    for (var i = 0; i < matrix[0].length; i++) {
      if (matrix[0][i] >= mayor) {
        mayor = matrix[0][i];
        pos = i;
      }
    }
    return pos;
  }

  findRowPiv(matrix, cp) {
    var mayor = ((matrix[1][matrix[1].length - 1]) / matrix[1][cp]);
    var pos = 1;
    for (var i = 1; i < matrix.length - 1; i++) {
      var div = ((matrix[i][matrix[i].length - 1]) / matrix[i][cp])       //Último elemento / elemento de la columna pivote.
      if (div <= mayor && div >= 0) {
        pos = i;
        mayor = div;
      }
    }
    return pos;
  }

  modifyPivRow(matrix, rp, cp) {
    var piv = matrix[rp][cp];
    for (var i = 0; i < matrix[rp].length; i++) {
      matrix[rp][i] = matrix[rp][i] / piv;
    }
    return matrix;
  }

  setCeros(matrix, rp, cp) {

    for (var i = 0; i < matrix.length; i++) {

      if (i !== rp) {
        var auxCP = matrix[i][cp];
        for (var j = 0; j < matrix[i].length; j++) {

          matrix[i][j] = matrix[i][j] - (auxCP * matrix[rp][j]);

        }

      }


    }

  }

  verifySolution(matrix) {
    var cont = matrix[0].length;
    console.log(cont);
    for (var i = 0; i < matrix[0].length; i++) {

      if (matrix[0][i] <= 0) {

        cont--;
      }

    }
    console.log(cont);
    if (cont == 0) {
      return true;
    } else {
      return false;
    }

  }

  reDraw(matrix){

    this.rowData = [];

    for (var i = 0; i <= this.nRestricciones; i++) {
      var newRow = {}
      var j = 0;
      for (const key of this.columnDefs) {
        newRow[key.field] = matrix[i][j];
        j++;
      }
      this.rowData.push(newRow);
    }

  }

  simplex(table) {
    /**TODO
     * Here, we are going to implement the steps of simplex method.
     * 
     */
    var colPiv = (this.findColPiv(table));
    var rowPiv = (this.findRowPiv(table, colPiv));
    var t = JSON.parse(JSON.stringify(table))

    this.modifyPivRow(t, rowPiv, colPiv);
    this.setCeros(t, rowPiv, colPiv);
    var optimal = this.verifySolution(t);
    var cont = 0;
    console.log(optimal);
    while (!optimal) {
      console.log("entró")
      colPiv = (this.findColPiv(t));
      rowPiv = (this.findRowPiv(t, colPiv));
      this.modifyPivRow(t, rowPiv, colPiv);
      this.setCeros(t, rowPiv, colPiv); 
      console.log('inside ',t);
      optimal = this.verifySolution(t);
      cont++;
      if(cont == 20){
        optimal = true;
      }

    }

    return t;
  }

  showSolution(matrix){
    var j = 0, posi;
    this.results[this.columnDefs[0].headerName] = - (matrix[0][matrix[0].length -1])
    for (const key of this.columnDefs.slice(1, this.nVariables + 1)){
      var one = 0;
      var ceros = 0;
      for (var i = 0; i < this.rowData.length; i++){
        if ( matrix[i][j] == 0 ) {
          ceros++;
        }else{
          if( matrix[i][j] == 1 ){
            one++;
            posi = i;
          }
        }
        
      }
      console.log(ceros, one, j)
      if(ceros == this.rowData.length - 1 && one == 1){
        this.results[key.field] = matrix[posi][this.columnDefs.length -1];
      }else{
        this.results[key.field] = 0;
      }
      j++;
    }
    var nResult = '';
    for(const key of this.results){
      console.log('k ',key);
    }
    console.log(this.results);
  }

  findSolution() {

    var table = [];

    for (var i = 0; i <= this.nRestricciones; i++) {
      table[i] = [];
    }

    for (var i = 0; i <= this.nRestricciones; i++) {

      for (const key of this.columnDefs) {
        var r = this.rowData[i];  
        var j = String(key.field);
        table[i].push(parseInt(r[j]))

      }
    }
    var nt = this.simplex(table);
    console.log(nt);
    this.reDraw(nt);
    this.showSolution(nt);
  }
}



