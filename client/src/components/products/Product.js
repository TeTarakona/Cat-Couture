import DiscountBadge from "./DiscountBadge";

const Product = ({
  name,
  description,
  price,
  imageName,
  imageDescription,
  discountType,
  discountValue,
}) => {
  return (
    <li className="product">
      <div className="card">
        <div>
          {imageName ? (
            <img
              src={`./img/${imageName}`}
              alt={imageDescription}
              className="product-image"
            />
          ) : (
            <img
              src="./img/cat-photo-default.jpg"
              alt="Default product cat"
              className="product-image"
            />
          )}
          {discountValue && discountType && (
            <DiscountBadge
              className="badge"
              discountValue={discountValue}
              discountType={discountType}
            />
          )}
        </div>
        <h3>{name}</h3>
        <p data-testid="product-description">{description}</p>
        <div className="price-buy">
          <p>Price {price}</p>
          <button className="button">Add to Cart</button>
        </div>
      </div>
    </li>
  );
};

export default Product;
