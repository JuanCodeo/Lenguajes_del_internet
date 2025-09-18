function calculadora()
{
    let numero_1 = parseFloat(prompt("Digite numero 1: "))
    let numero_2 = parseFloat(prompt("Digite numero 2: "))
    let operacion = prompt("Digite la operación que desea hacer: ")

    let resultado;
    if(operacion == "+")//Si hay un error de ortografía el sistema no lo detecta 
    {
        resultado = numero_1 + numero_2;
        console.log("El resultado de la suma es: "+resultado)
    }
    else if(operacion == "-")
    {
        resultado = numero_1 - numero_2;
        console.log("El resultado de la resta es: "+resultado)
    }
    else if(operacion == "*")
    {
        resultado = numero_1*numero_2;
        console.log("El resultado de la multiplicación es: "+resultado)
    }
    else if(operacion == "/")
    {
        if(numero_2 == 0)
        {
            alert("Error no se puede dividir por 0")
            return;
        }
        resultado = numero_1/numero_2;
        console.log("El resultado de la división es: "+resultado)
    }
    //console.log(numero_1, numero_2);
}

const productos =
[
    {id:1, name:"Producto_1", price:50},
    {id:2, name:"Producto_2", price:150},
    {id:3, name:"Producto_3", price:250},
    {id:4, name:"Producto_4", price:350}
];

function Mostrar_Productos()
{
    const productos_div = document.getElementById("Productos");
    productos.forEach(producto => 
    {
        const producto_div = document.createElement('div');
        producto_div.innerHTML = `<span>${producto.name} - ${producto.price}</span>
        <button>Agregar al carrito</button>`;
        productos_div.appendChild(producto_div);
    });
}

Mostrar_Productos();