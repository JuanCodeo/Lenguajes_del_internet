function Carrito() {
    return {
        items: [], //Aca se crea el arreglo

        agregarItem: function(nombre, precio) {
            if (precio <= 0) {
                console.error("El precio debe ser mayor a cero."); //Hace la validacion de que no puede ser menor o igual a 0
                return;
            }

            const itemExistente = this.items.find(item => item.nombre === nombre);

            if (itemExistente) {
                itemExistente.cantidad += 1;//Si ya existe le agrega un +1 en cantidad
                console.log(`Se agregó otro ${nombre}.`, this.items);
            } else {
                this.items.push({ nombre, precio, cantidad: 1 });
                console.log(`Se agregó ${nombre} al carrito.`, this.items);//Si no existe crea uno
            }
        },

        calcularTotal: function() {
            const total = this.items.reduce((total, item) => {
                return total + item.precio * item.cantidad;
            }, 0);
            console.log(`Total del carrito: $${total}`);//Hace el total con la formula de precio*cantidad
            return total;
        },

        vaciarCarrito: function() {
            this.items = [];
            console.log("Carrito vaciado.", this.items);//Lo vacia al inicializarlo otra vez
        },

        eliminarItem: function(nombre) {
            this.items = this.items.filter(item => item.nombre !== nombre);
            console.log(`Se eliminó ${nombre} del carrito.`, this.items);//Hace un filtro para elimar por nombre
        }
    };
}

const Carrito1 = Carrito();

Carrito1.agregarItem("Pan", 200)
Carrito1.agregarItem("Pan", 200)
Carrito1.agregarItem("Galleta", 400)
Carrito1.calcularTotal();
Carrito1.eliminarItem("Galleta");
Carrito1.vaciarCarrito();