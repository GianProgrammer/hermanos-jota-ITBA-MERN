import "../styles/home.css"; // Asegurate de importar el CSS que tiene .prod-dest y .card

const productos = [
  {
    id: 1,
    ruta: "img/Aparador Uspallata.png",
    nombre: "Aparador Uspallata",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.",
    medidas: "180 x 45 x 75 cm"
  },
  {
    id: 2,
    ruta: "img/Biblioteca Recoleta.png",
    nombre: "Biblioteca Recoleta",
    descripcion: "Sistema modular de estantes abierto en acero Sage Green y repisas en roble claro. Versátil y elegante.",
    medidas: "100 x 35 x 200 cm"
  },
  {
    id: 3,
    ruta: "img/Butaca Mendoza.png",
    nombre: "Butaca Mendoza",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de guatambú. Respaldo curvo y diseño orgánico.",
    medidas: "80 x 75 x 85 cm"
  }
];

function ProductosDestacados() {
  return (
    <section className="prod-dest">
      <h2 className="text-center mb-4">Productos Destacados</h2>
      {productos.map((prod) => (
        <div key={prod.id} className="card">
          <img
            src={prod.ruta}
            alt={prod.nombre}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{prod.nombre}</h5>
            <p className="card-text">{prod.descripcion}</p>
            <p>
              <b>Medidas:</b> {prod.medidas}
            </p>
            <a href={`/producto/${prod.id}`} className="btn">
              Ver más
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductosDestacados;
