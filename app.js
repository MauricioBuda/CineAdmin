import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get,  child } from "firebase/database";

import Swal from 'sweetalert2'




const firebaseConfig = {
  apiKey: "AIzaSyDzJlBt55BL3r2vIhRwlsMLs_0yR_mxABw",
  authDomain: "cinelanus-18fe3.firebaseapp.com",
  projectId: "cinelanus-18fe3",
  storageBucket: "cinelanus-18fe3.appspot.com",
  messagingSenderId: "507189909582",
  appId: "1:507189909582:web:c3430c0d8211fb4ce20b1f",
  measurementId: "G-RZPTR4X6V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);









////////////////////////////////////////////////////////////////////////////////////////////////////









let hayFuncion
let vacantes
let peliExistente
let linkExistente




// Función para saber cuantas vacantes quedan ↓
async function cantidadVacantesDisponibles () {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `vacantes/vacantes`)).then((snapshot) => {
      if (snapshot.exists()) {
        vacantes = snapshot.val()
        // vacantesDisponibles.textContent = vacantes;
      } else {
        console.log("Error");
      }
    }).catch((error) => {
      console.error(error);
    });
    return vacantes
}

cantidadVacantesDisponibles()




// Función para saber si hay funcion ↓
async function hayONoHayFuncion () {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `HayFuncion`)).then((snapshot) => {
      if (snapshot.exists()) {
        hayFuncion = snapshot.val()
      } else {
        console.log("Error");
      }
    }).catch((error) => {
      console.error(error);
    });
    return hayFuncion;
  }

  hayONoHayFuncion()









// Función para saber que pelicula hay ↓
async function hayPeli () {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `Pelicula`)).then((snapshot) => {
    if (snapshot.exists()) {
      peliExistente = snapshot.val()
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error(error);
  });
  return peliExistente
}

hayPeli();









// Función para saber que link hay ↓
async function hayLink () {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `Trailer`)).then((snapshot) => {
    if (snapshot.exists()) {
      linkExistente = snapshot.val()
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error(error);
  });
  return peliExistente
}

hayLink();








  




  // Función para modificar vacantes ↓
function modificarVacantes(vacantes) {
    const db = getDatabase();
    const vacantesRef = ref(db, 'vacantes/');
  
    // Leer el valor actual de vacantes
    get(vacantesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const vacantesActuales = snapshot.val().vacantes || 0; // Valor actual o 0 si no existe
        const nuevoValor =  vacantes; // Sumar 2 al valor actual
  
        // Escribir el nuevo valor en la base de datos
        set(vacantesRef, { vacantes: nuevoValor })
          .then(() => {
            console.log("Vacantes actualizadas:", nuevoValor);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Vacantes actualizadas en página principal",
                showConfirmButton: false,
                timer: 1800
              });
          })
          .catch((error) => {
            console.error("Error al actualizar vacantes:", error);
          });
      } else {
        console.log("No existe el valor de vacantes");
      }
    }).catch((error) => {
      console.error("Error al leer vacantes:", error);
    });
  }









    // Función para modificar vacantes ↓
function modificarPeliculaEnPagficial(peli) {
  const db = getDatabase();
  const vacantesRef = ref(db, 'Pelicula');

  // Leer el valor actual de vacantes
  get(vacantesRef).then((snapshot) => {
    if (snapshot.exists()) {
      // const vacantesActuales = snapshot.val().vacantes || 0; // Valor actual o 0 si no existe
      const nuevoValor =  peli;

      // Escribir el nuevo valor en la base de datos
      set(vacantesRef, nuevoValor )
        .then(() => {
          console.log("Peli actualizada:", nuevoValor);
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Película modificada en página principal",
              showConfirmButton: false,
              timer: 1800
            });
        })
        .catch((error) => {
          console.error("Error al actualizar peli:", error);
        });
    } else {
      console.log("No existe el valor de peli");
    }
  }).catch((error) => {
    console.error("Error al leer peli:", error);
  });
}









    // Función para modificar función ↓
function modificarFuncion(respuesta) {
  const db = getDatabase();
  const vacantesRef = ref(db, 'HayFuncion');

  // Leer el valor actual de vacantes
  get(vacantesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const nuevoValor =  !respuesta; 

      // Escribir el nuevo valor en la base de datos
      set(vacantesRef, nuevoValor)
        .then(() => {
          console.log(`Próxima función ${nuevoValor? "habilitada" : "deshabilitada"}`, nuevoValor);
          Swal.fire({
              position: "center",
              icon: `${nuevoValor? "success" : "warning"}`,
              title: `Función ${nuevoValor? "habilitada" : "deshabilitada"}`,
              showConfirmButton: false,
              timer: 1800
            });
        })
        .catch((error) => {
          console.error("Error al actualizar funcion:", error);
        });
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error("Error al traer datos", error);
  });
}









    // Función para modificar link ↓
    function modificarLink(link) {
      const db = getDatabase();
      const vacantesRef = ref(db, 'Trailer');
    
      // Leer el valor actual de vacantes
      get(vacantesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const nuevoValor =  link; 
    
          // Escribir el nuevo valor en la base de datos
          set(vacantesRef, nuevoValor)
            .then(() => {
              Swal.fire({
                  position: "center",
                  icon: 'success',
                  title: `Modificado. ¡Por las dudas probalo!`,
                  showConfirmButton: false,
                  timer: 2500
                });
            })
            .catch((error) => {
              console.error("Error al actualizar funcion:", error);
            });
        } else {
          console.log("Error");
        }
      }).catch((error) => {
        console.error("Error al traer datos", error);
      });
    }









////////////////////////////////////////////////////////////////////////////////////////////////////










let inputVacantes = document.getElementById('inputVacantes');
let btnVacantes = document.getElementById('btnVacantes');
let inputPelicula = document.getElementById('inputPelicula');
let btnPelicula = document.getElementById('btnPelicula');
let inputTrailer = document.getElementById('inputTrailer');
let btnTrailer = document.getElementById('btnTrailer');
let btnEliminarTrailer = document.getElementById('eliminarTrailer');
let btnHayFuncion = document.getElementById('hayFuncion');


btnVacantes.addEventListener('click', confirmarActualizacionDeVacantes);
btnPelicula.addEventListener('click', actualizarPeliEnPaginaOficial);
btnTrailer.addEventListener('click', actualizarLinkEnPaginaOficial);
btnEliminarTrailer.addEventListener('click', eliminarTrailer);
btnHayFuncion.addEventListener('click', confirmarSiHayONoFuncion);










function confirmarActualizacionDeVacantes () {
  let vacantesIngresadas = inputVacantes.value;
  if (vacantesIngresadas > 50 || vacantesIngresadas === '' ){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Las vacantes pueden ser entre 0 y 50",
        showConfirmButton: false,
        timer: 1800
      });
      vacantesIngresadas = '';
      return
  } else if (vacantes === vacantesIngresadas){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Las vacantes ingresadas son iguales a las existentes",
      showConfirmButton: false,
      timer: 1800
    });
    vacantesIngresadas = '';
    return
  } else {
    Swal.fire({
      title: `Vas a cambiar las vacantes existentes (${vacantes}) por ${vacantesIngresadas}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificarlas',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        modificarVacantes(vacantesIngresadas);
        vacantesIngresadas = '';
        setTimeout(() => {
          location.reload(true);
        }, 1800);
      }
    });
  }
}





async function actualizarPeliEnPaginaOficial() {
  let peliculaNueva = inputPelicula.value;
  Swal.fire({
    title: `${peliculaNueva === ''? 'Vas a dejar la sección sin película' : `Vas a cambiar ${peliExistente} por ${peliculaNueva}`}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificarla',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      modificarPeliculaEnPagficial(peliculaNueva);
      setTimeout(() => {
        location.reload(true);
      }, 1800);
      inputPelicula.value = '';
    }
  })
}









async function actualizarLinkEnPaginaOficial() {
  let linkNuevo = inputTrailer.value;

  if (linkNuevo === '' ){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Campo vacío, gil",
      showConfirmButton: false,
      timer: 1800
    });
    return
} else {
    Swal.fire({
      title: `${linkExistente === ''? `Vas a agregar el link: ${linkNuevo}` :  `Vas a cambiar ${linkExistente} por ${linkNuevo}`}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificarlo',
      text: '(acordate de poner http://..)',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        modificarLink(linkNuevo);
        setTimeout(() => {
          location.reload(true);
        }, 1800);
        inputTrailer.value = '';
      }
    })
 }
}









async function eliminarTrailer() {
  Swal.fire({
    title: `Vas a eliminar la sección de trailer`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminarla',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      modificarLink('');
    }
  })
}












async function confirmarSiHayONoFuncion() {
  let respuesta = await hayONoHayFuncion();
  modificarFuncion(respuesta);
}