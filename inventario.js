export default class Inventario{
    constructor(tableArt,tableInfo){
        //Tabla de los Artículos
        this._tableArt = tableArt;
        //Tabla de la Información
        this._tableInfo = tableInfo;
        //Número de Artículos
        this._numArt = 0;
        //Precio total de todos los artículos
        this._precio = 0;
        //Vector de los artículos
        this._primerArticulo = null;
        this._ultimoArticulo = null;
        //Contador vector
        this._contador = 0;        
        console.log(this._articulos);
    }

    _borrar(row,articulo){
        let btnBorrar = document.createElement("input");
        btnBorrar.type="button";
        btnBorrar.value = "Borrar";
        btnBorrar.className = "btn btn-danger";
        btnBorrar.addEventListener("click",()=>{
          this.borrarArticulo(row, articulo);
        });
        row.cells[5].innerHTML="";
        row.cells[5].appendChild(btnBorrar);
    }

    AgregarProducto(objArticulo){      
      if(this._primerArticulo == null){
        this._primerArticulo = objArticulo;
        this._ultimoArticulo = objArticulo;
        this._contador++;
      }else{
        this._agregarYOrdenar(objArticulo);

        // let anterior = this._ultimoArticulo;
        // this._ultimoArticulo.siguiente = objArticulo;
        // this._ultimoArticulo = objArticulo;
        // this._ultimoArticulo.anterior = anterior;
        // this._contador++;       
        
      }
      
     console.log(this._primerArticulo);

    }
   _agregarYOrdenar(objArticulo){
     let obj = objArticulo;
    if(obj < this._primerArticulo){
      obj.siguiente = this._primerArticulo;
      this._primerArticulo.anterior = obj;
      this._primerArticulo = obj;
    }else if(obj > this._ultimoArticulo){
      obj.anterior = this._ultimoArticulo;
      this._ultimoArticulo.siguiente = obj;
      this._ultimoArticulo = obj;
    }else{
      let guardar = this._primerArticulo.siguiente;
      while(guardar != null && obj.siguiente == null){
        if(guardar > obj){
          obj.siguiente = guardar;
          obj.anterior = guardar.anterior;
          guardar.anterior.siguiente = obj;
          guardar.anterior = obj;
        }
        guardar = guardar.siguiente;
      }
    }
   }
    
    //Método para borrar un artículo
    borrarArticulo(row,articulo){
      let pos = this._buscarArticulo(articulo.codigo);
      if(pos == this._primerArticulo){
        this._primerArticulo = pos.siguiente;
        this._primerArticulo.anterior = null;
      }else if(this._ultimoArticulo == pos){
        let posA = this._buscarAnterior(articulo.codigo);
        posA.siguiente = null; 
        this._ultimoArticulo = posA;
      }
      else{
        let posA = this._buscarAnterior(articulo.codigo);
        posA.siguiente = pos.siguiente; 
        pos.siguiente.anterior = posA; 

        /*1 2 3*/
        /*1   3*/
      }
      
      console.log(this._primerArticulo);
      row.remove();
    }

    _buscarAnterior(codigo){
      var buscar = this._primerArticulo;
      while(buscar.siguiente.codigo != codigo){
          buscar = buscar.siguiente;
        }
        return buscar;
    }
    
  
    _buscarArticulo(codigo){
      var buscar = this._primerArticulo;
      while(buscar.codigo != codigo){
          buscar = buscar.siguiente;
        }
        return buscar;
      }


    Invertir(){
      let ultimo = this._ultimoArticulo;
      while(ultimo !== null){
        console.log('invertido por código: ' + ultimo.codigo);
        ultimo = ultimo.anterior;
      }
    }
    /* 1,2,3,4,5 */
    /* 5,4,3,2,1 */   

    //Agrega el artículo a la interfaz de la tabla
    AgregarEnTabla(articulo, objArticulo){
        //Creación de las filas y columnas
        let row = this._tableArt.insertRow(-1);
        let cellCodigo = row.insertCell(0);
        let cellNombre = row.insertCell(1);
        let cellPrecio = row.insertCell(2);
        let cellCantidad = row.insertCell(3);
        let cellDescripcion = row.insertCell(4);
        row.insertCell(5);
        

        cellCodigo.innerHTML = articulo.codigo;
        cellNombre.innerHTML = articulo.nombre;
        cellPrecio.innerHTML = articulo.precio;
        cellCantidad.innerHTML = articulo.cantidad;
        cellDescripcion.innerHTML = articulo.descripcion;
        this._borrar(row,articulo);

        this._numArt++; //Se aumenta el número de artículos totales

        
        this._precio += (articulo.precio * articulo.cantidad); //Se calcula el precio total de todos los artículos

        //Se imprime la información del total de artículos y el precio
        this._tableInfo.rows[0].cells[1].innerHTML = this._numArt;
        this._tableInfo.rows[1].cells[1].innerHTML = this._precio;

        //Se crea un objeto con toda la información del artículo
         objArticulo = {
            codigo: articulo.codigo,
            nombre: articulo.nombre,
            precio: articulo.precio,
            cantidad: articulo.cantidad,
            descipcion: articulo.descripcion
        };
        return objArticulo;
      
        //Se agrega el artículo al vector 

    }
  }
