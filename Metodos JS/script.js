function crear_repartidor (nombre){
    return{
    nombre: nombre,
    pedidos_completados: 0,
    calificacion_promedio : 0,
    activo: true,
 
    presentarse: function(){
        console.log("Nombre: "+this.nombre+" pedidos_completados"+this.pedidos_completados+" calificacion de "+this.calificacion_promedio+" estoy activo? " + this.activo)
    },
 
    completar_pedido: function(calificacion){
        this.pedidos_completados ++;
       
        if(this.calificacion_promedio ===0){
            this.calificacion_promedio = calificacion
        }
        this.calificacion_promedio = (calificacion + this.calificacion_promedio) / this.calificacion_promedio
       
       
    },
 
    activar: function(){
        this.activo = true;
    },
    desactivar: function(){
        this.activo =false;
    }
    }
}
 
 
const repartidor={
    nombre: "juan",
    pedidos_completados: 0,
    calificacion_promedio :0,
    activo: true,
 
    presentarse: function(){
        console.log("Nombre: "+this.nombre+" pedidos_completados"+this.pedidos_completados+" calificacion de "+this.calificacion_promedio+" estoy activo?" + this.activo)
    },
    completar_pedido: function(calificacion){
        pedidos_completados ++;
        if(this.calificacion_promedio === 0){
            this.calificacion_promedio ++
        }else{
            calificacion_promedio = (calificacion + this.calificacion_promedio) / this.pedidos_completados
        }
       
    },
 
    activar: function(){
        this.activo = true;
    },
    desactivar: function(){
        this.activo =false;
    }
}
 
 
const reeparidor1 = crear_repartidor("juan");
reeparidor1.presentarse();
 
reeparidor1.desactivar();
 
reeparidor1.presentarse();
 
reeparidor1.completar_pedido(2)
reeparidor1.presentarse();
reeparidor1.completar_pedido(5)
reeparidor1.activar();
reeparidor1.presentarse();
 