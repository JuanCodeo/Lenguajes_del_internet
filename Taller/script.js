// Estos son los elementos del html
const Boton_Abrir = document.getElementById("Abrir_Modal");
const Boton_Cerrar = document.getElementById("Cerrar_Modal");
const Desplegable = document.getElementById("Modal_Overlay");
const Body = document.getElementById("Body");

// aqui se hace la función para que al dar click en el Boton_Abrir lo haga 
function Abrir()
{
    Boton_Abrir.addEventListener("click", () => 
    {
        Desplegable.classList.add("visible");
    });
}
Abrir() //Aqui la activamos 

// Estos es lo opuesto al dar click que esto lo cierre 
function Cerrar()
{
    Boton_Cerrar.addEventListener("click", () => 
    {
        Desplegable.classList.remove("visible");
    });
}
Cerrar()

function Cerrar_Body()
{
    Desplegable.addEventListener("click", () => 
    {
        Desplegable.classList.remove("visible");
    });
}
Cerrar_Body()

