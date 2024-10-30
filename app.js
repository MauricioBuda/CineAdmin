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





// Función para saber cuantas vacantes quedan ↓
async function cantidadVacantesDisponibles () {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `vacantes/vacantes`)).then((snapshot) => {
      if (snapshot.exists()) {
        vacantes = snapshot.val()
        // vacantesDisponibles.textContent = vacantes;
        console.log(vacantes)
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
        console.log(hayFuncion)
      } else {
        console.log("Error");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  hayONoHayFuncion()




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
        // set(vacantesRef, { vacantes: 2 }); // Inicializar en 2 si no existe
      }
    }).catch((error) => {
      console.error("Error al leer vacantes:", error);
    });
  }









////////////////////////////////////////////////////////////////////////////////////////////////////










let inputVacantes = document.getElementById('inputVacantes');
let btnVacantes = document.getElementById('btnVacantes');

btnVacantes.addEventListener('click', confirmarActualizacionDeVacantes)









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
      return
  } else if (vacantes === vacantesIngresadas){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Las vacantes ingresadas son iguales a las existentes",
      showConfirmButton: false,
      timer: 1800
    });
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
        }, 2000);
      }
    });
  }
}