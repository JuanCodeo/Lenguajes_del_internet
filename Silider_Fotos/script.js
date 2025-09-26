const Slider = document.getElementById("Slider");
let index = 0;

function Siguiente_Img()
{
    index = (index + 1) % Slider.children.length; 
    Actualizar_Posicion(); 
}

function Actualizar_Posicion()
{
    Slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(Siguiente_Img, 3000); //Aqui se le asigna el tiempo de cambio 