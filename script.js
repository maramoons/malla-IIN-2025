
const materias = [
  { id: "ayed1", nombre: "Algoritmos y Estructuras de Datos I", creditos: 9, requisitos: [] },
  { id: "fundmat", nombre: "Fundamentos de Matemática", creditos: 7, requisitos: [] },
  { id: "orga1", nombre: "Organización y Arq. de Computadoras I", creditos: 7, requisitos: [] },
  { id: "emprende", nombre: "Emprendedurismo", creditos: 4, requisitos: [] },
  { id: "expresion", nombre: "Expresión Oral y Escrita", creditos: 4, requisitos: [] },
  { id: "discreta", nombre: "Matemática Discreta", creditos: 7, requisitos: [] },
  { id: "ayed2", nombre: "Algoritmos y Estructuras de Datos II", creditos: 7, requisitos: ["ayed1"] },
  { id: "algebra", nombre: "Álgebra Lineal", creditos: 7, requisitos: ["fundmat", "discreta"] },
  { id: "calculo1", nombre: "Cálculo I", creditos: 7, requisitos: ["fundmat"] },
  { id: "lp1", nombre: "Lenguajes de Programación I", creditos: 7, requisitos: ["fundmat"] },
  { id: "orga2", nombre: "Organización y Arq. de Computadoras II", creditos: 7, requisitos: ["orga1"] },
  { id: "so", nombre: "Sistemas Operativos", creditos: 8, requisitos: ["orga2"] },
  { id: "bd1", nombre: "Bases de Datos I", creditos: 7, requisitos: ["ayed2"] },
  { id: "calculo2", nombre: "Cálculo II", creditos: 7, requisitos: ["calculo1"] },
  { id: "fisica1", nombre: "Física I", creditos: 7, requisitos: ["calculo1"] },
  { id: "lp2", nombre: "Lenguajes de Programación II", creditos: 7, requisitos: ["lp1"] },
  { id: "estadis1", nombre: "Estadística I", creditos: 6, requisitos: ["algebra"] },
  { id: "pw1", nombre: "Programación Web I", creditos: 6, requisitos: ["lp1"] },
  { id: "bd2", nombre: "Bases de Datos II", creditos: 6, requisitos: ["bd1"] },
  { id: "ingsoft1", nombre: "Ingeniería de Software I", creditos: 7, requisitos: ["ayed2"] },
  { id: "fisica2", nombre: "Física II", creditos: 7, requisitos: ["fisica1"] },
  { id: "redes1", nombre: "Redes de Computadoras I", creditos: 6, requisitos: ["orga2"] },
  { id: "so2", nombre: "Sistemas Operativos II", creditos: 6, requisitos: ["so"] },
  { id: "taller1", nombre: "Taller de Programación I", creditos: 6, requisitos: ["ayed2"] },
  { id: "taller2", nombre: "Taller de Programación II", creditos: 6, requisitos: ["taller1"] }
];

const semestres = {
  1: ["ayed1", "fundmat", "orga1", "emprende", "expresion", "discreta"],
  2: ["ayed2", "algebra", "calculo1", "lp1", "orga2"],
  3: ["so", "bd1", "calculo2", "fisica1", "lp2"],
  4: ["estadis1", "pw1", "bd2", "ingsoft1", "fisica2"],
  5: ["redes1", "so2", "taller1"],
  6: ["taller2"]
};

const malla = document.getElementById("malla");
const contador = document.getElementById("contador");
let creditosTotales = 0;

function renderMalla() {
  malla.innerHTML = "";
  for (const [semestre, ids] of Object.entries(semestres)) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerText = `Semestre ${semestre}`;
    malla.appendChild(div);

    ids.forEach(id => {
      const mat = materias.find(m => m.id === id);
      const divMat = document.createElement("div");
      divMat.className = "materia";
      divMat.id = mat.id;
      divMat.innerHTML = `
        ${mat.nombre}
        <div class="tooltip">
          Créditos: ${mat.creditos}<br>
          Requisitos: ${mat.requisitos.length ? mat.requisitos.join(", ") : "Ninguno"}
        </div>
      `;
      divMat.addEventListener("click", () => toggleAprobada(mat.id));
      malla.appendChild(divMat);
    });
  }
  actualizarEstado();
}

function toggleAprobada(id) {
  const div = document.getElementById(id);
  const mat = materias.find(m => m.id === id);
  if (!div.classList.contains("habilitada")) return;
  const yaAprobada = div.classList.toggle("aprobada");
  creditosTotales += yaAprobada ? mat.creditos : -mat.creditos;
  contador.innerText = creditosTotales;
  actualizarEstado();
}

function actualizarEstado() {
  materias.forEach(mat => {
    const div = document.getElementById(mat.id);
    if (div.classList.contains("aprobada")) {
      div.classList.add("habilitada");
      return;
    }
    const requisitosCumplidos = mat.requisitos.every(req => {
      const r = document.getElementById(req);
      return r && r.classList.contains("aprobada");
    });
    if (requisitosCumplidos) {
      div.classList.add("habilitada");
    } else {
      div.classList.remove("habilitada");
    }
  });
}

renderMalla();
