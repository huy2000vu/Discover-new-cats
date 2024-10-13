export default function History({ catList }) {
  return (
    <div className="historyMain">
      <div className="title">Cat history</div>
      {catList &&
        catList.map((cat, index) => (
          <div className="cardDetails">
            <img key={index} src={cat.image} alt={`Cat ${index}`} />
            <div className="description">{cat.description}</div>
          </div>
        ))}
    </div>
  );
}
