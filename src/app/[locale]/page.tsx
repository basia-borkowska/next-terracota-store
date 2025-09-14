import { Container } from "@/shared/ui/layout/Container";
import DiscountedProductsCarousel from "@/widgets/carousels/DiscountedProductsCarousel/DiscountedProductsCarousel";
import NewProductsCarousel from "@/widgets/carousels/NewProductsCarousel/NewProductsCarousel";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Image
        className="-mt-navbar-height"
        src="/images/hero.png"
        alt="Hero"
        width={1920}
        height={600}
        priority
      />

      <Container>
        <NewProductsCarousel />
      </Container>

      <Image
        className="w-full"
        src="/images/home_banner.png"
        alt="Hero"
        width={1920}
        height={400}
      />

      <Container>
        <DiscountedProductsCarousel />
      </Container>
    </>
  );
};

export default Home;
