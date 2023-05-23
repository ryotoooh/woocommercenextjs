import { GetStaticProps } from "next";
import { fetchWooCommerceProducts } from "../utils/wooCommerceApi";
import { Product } from "../utils/wooCommerceTypes";

// declare types for the functional component props //
interface Props {
    products: Product[];
}

export default function About(props: Props) {
    // destructure props //
    const { products } = props;

    console.log("--WooCommerce Products: ", products);

    return (
        <h1>About</h1>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
      console.error(error)
    );
  
    if (!wooCommerceProducts) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        products: wooCommerceProducts.data,
      },
      // revalidate: 60 // regenerate page with new data fetch after 60 seconds
    };
  };