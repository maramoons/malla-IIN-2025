const malla = document.getElementById("malla");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCreditos = document.getElementById("modalCreditos");
const modalRequisitos = document.getElementById("modalRequisitos");

// Datos de ejemplo, cargaremos los verdaderos luego
const materiasPorSemestre = {
  "1er Semestre": [
    { nombre: "Algoritmos y Estructuras de Datos I", creditos: 9 },
    { nombre: "Emprendedorismo", creditos: 4 },
    { nombre: "Expresión Oral y Escrita", creditos: 4 },
    { nombre: "Fundamentos de Matemática", creditos: 7 },
    { nombre: "Matemática Discreta", creditos: 7 },
    { nombre: "Organización y Arquitectura de Computadoras I", creditos: 7 },
    { nombre: "Inglés", creditos: 4 },
  ],
  // Agrega el resto de los semestres aquí...
};

// Crear visualización
for (const [semestre, materias] of Object.entries(materiasPorSemestre)) {
  const contenedor = document.createElement("div");
  contenedor.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  contenedor.appendChild(titulo);

  materias.forEach((materia) => {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = materia.nombre;
    div.onclick = () => {
      modalTitle.textContent = materia.nombre;
      modalCreditos.textContent = materia.creditos;
      modalRequisitos.textContent = materia.requisitos || "Ninguno";
      modal.classList.remove("hidden");
    };
    contenedor.appendChild(div);
  });

  malla.appendChild(contenedor);
}

// Cerrar modal
closeModal.onclick = () => modal.classList.add("hidden");
window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

