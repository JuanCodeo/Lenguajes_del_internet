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
        resultado = numero_1/numero_2;
        console.log("El resultado de la división es: "+resultado)
    }
    //console.log(numero_1, numero_2);
}