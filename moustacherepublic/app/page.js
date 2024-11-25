import Link from 'next/link';
import Image from "next/image";
import './styles/catalog.css';

// Display a square image linking to a product page.
// DEBUG: Link to product page?
function ProductSquare(details){
  return (
    <>
      <div className="catalogitem">
      <Link href="/products/classictee">
        <Image width={300} height={400}
        src={details.filename} alt={details.alt}>
        </Image>
      </Link>
      <p>{details.alt}</p>
    </div>
    </>
  );
}

// Yes, the filename and alt pass is manual here, but I have to focus on total completion for products and cart.
export default function ProductCatalog(){
  return (
      <>
      <h1> Product Catalog </h1>
      <div className="productcatalog">
        <ProductSquare
          filename="https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg"
          alt="Classic Tee">
        </ProductSquare>
        <ProductSquare
          filename="https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg"
          alt="Another Classic Tee">
        </ProductSquare>
    </div>
      </>
  );
}
