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

      <Image
        className="w-full"
        src="/images/home_banner.png"
        alt="Hero"
        width={1920}
        height={400}
      />
    </>
  );
};

export default Home;
