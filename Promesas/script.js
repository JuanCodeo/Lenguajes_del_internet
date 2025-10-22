const resultado = document.getElementById('Resultado');

async function Obtener_Usuarios() 
{
    try
    {
        const Respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const Datos = await Respuesta.json();
        resultado.innerHTML = "";
        Datos.forEach(usuario => {resultado.innerHTML += `<p>${usuario.name} - ${usuario.email} - ${usuario.company.bs} - ${usuario.address.geo.lat} - ${usuario.address.geo.lng}</p>`;});
    }
    catch(Error)
    {   
        console.log(Error);
    }
};

