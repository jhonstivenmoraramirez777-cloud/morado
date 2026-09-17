console.log("La página se cargó correctamente");

const titulo = document.querySelector("h1");

if (titulo) {

    titulo.addEventListener("click", function () {

        alert("Bienvenido a mi página web");

    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let user = document.getElementById("regUser").value;
        let email = document.getElementById("regEmail").value;
        let pass = document.getElementById("regPass").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        let yaExiste = usuarios.find(u => u.nombre === user);

        if (yaExiste) {
            alert("Ese nombre de usuario ya existe, elige otro");
            return;
        }
        
        let nuevoId = usuarios.length > 0
            ? Math.max(...usuarios.map(u => u.id)) + 1
            : 1;

        let nuevoUsuario = {
            id: nuevoId,
            nombre: user,
            correo: email,
            password: pass,
            rol: "cliente"
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuario registrado correctamente");

        window.location.href = "login.html";

    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let user = document.getElementById("loginUser").value;
        let pass = document.getElementById("loginPass").value;
        
        if (user === "admin" && pass === "admin") {

            alert("Bienvenido Administrador");

            localStorage.setItem("sesion", "admin");

            window.location.href = "administrador/dashboard_admin.html";

            return;
        }
        
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let encontrado = usuarios.find(u =>
            u.nombre === user &&
            u.password === pass &&
            u.rol === "cliente"
        );

        if (encontrado) {

            alert("Bienvenido Cliente");

            localStorage.setItem("sesion", "cliente");
            localStorage.setItem("sesionId", encontrado.id);

            window.location.href = "dashboard_cliente.html";

        } else {

            alert("Usuario o contraseña incorrectos");

        }
    });
}

function logout() {

    localStorage.removeItem("sesion");
    localStorage.removeItem("sesionId");

    alert("Sesión cerrada");

    window.location.href = "login.html";

}

function mostrar(seccion) {

    let cajas = document.querySelectorAll(".caja");

    cajas.forEach(function (caja) {

        caja.classList.add("oculto");

    });

    let elemento = document.getElementById(seccion);

    if (elemento) {

        elemento.classList.remove("oculto");

    }
}

function cargarPerfil() {

    let id = localStorage.getItem("sesionId");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios.find(u => u.id == id);

    if (usuario) {

        let campoUser = document.getElementById("clienteUser");
        let campoEmail = document.getElementById("clienteEmail");

        if (campoUser) campoUser.value = usuario.nombre;
        if (campoEmail) campoEmail.value = usuario.correo;

    }
}

function guardarPerfil() {

    let user = document.getElementById("clienteUser").value;
    let email = document.getElementById("clienteEmail").value;

    let id = localStorage.getItem("sesionId");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let index = usuarios.findIndex(u => u.id == id);

    if (index !== -1) {

        usuarios[index].nombre = user;
        usuarios[index].correo = email;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Datos actualizados correctamente");

    } else {

        alert("No hay usuario registrado");

    }
}

let indice = 0;

function carruselAutomatico(){

    let slides = document.querySelectorAll(".slide");

    if(slides.length === 0) return;

    slides.forEach(function(slide){
        slide.classList.remove("activo");
    });

    indice++;

    if(indice >= slides.length){
        indice = 0;
    }

    slides[indice].classList.add("activo");

}

setInterval(carruselAutomatico,3000);