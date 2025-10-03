function ProductCard({ producto, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(producto)}>
      <img src={producto.ruta} alt={producto.nombre} className="card-img-top" />
      <div className="card-body">
        <h5>{producto.nombre}</h5>
        <p>{producto.descripcion}</p>
        <p><b>Medidas:</b> {producto.medidas}</p>
      </div>
    </div>
  );
}
export default ProductCard;
