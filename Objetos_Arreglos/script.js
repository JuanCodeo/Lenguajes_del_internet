const Balon = //De esta forma se hace un objeto
{
    //Aqui van las caracterizticas 
    marca: 'Golty',
    color: 'Negro',
    numero: '5',
    inflar: function() //Estas funciones son conosidas como metodos
    {
        console.log("Inflando el balon...");
    }
};

console.log(Balon);
console.log("La Marca del balon es: "+ Balon.marca)
console.log(Balon.inflar())

function Crear_Persona(Nombre, Apellido, Edad, Genero, Profesion)
{
    return {
        Nombre, 
        Apellido,
        Edad,
        Genero,
        Profesion,
        Saludar: function()
        {
            console.log("Hola, Como estas?, mi nombre es: " + this.Nombre);
        },
        Hablar_Profesion: function()
        {
            console.log("Mi Profesion es: " + this.Profesion)
        }        
    };
};

const Persona_1 = Crear_Persona("Juan","Apellido","18","Masculino","Desarrollador");
console.log(Persona_1.Saludar());
console.log(Persona_1.Hablar_Profesion())

const frutas = ["Pera","Papaya","Fresa","Manzana"]
const nombres = ["Juan","Samuel","Santiago","David"]

//frutas.forEach(e => //De esta forma se recorre un arreglo 
//{
  //  console.log(e)
//});

const Imprimir_Arreglo =
{
    imprimir: function(Arreglo)
    {
        Arreglo.forEach(e =>
        {
            console.log(e)
        });
    }
}

console.log("Ahora se imprime Nombres: ")
Imprimir_Arreglo.imprimir(nombres);
console.log("Ahora se imprime Frutas: ")
Imprimir_Arreglo.imprimir(frutas);
