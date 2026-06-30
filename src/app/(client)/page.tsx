import Hero from "./_components/hero";
import Nav from "./_components/nav";
import Offer from "./_components/offers";
import Footer from "./_components/footer";
import About from "./_components/about";
import NewsLetter from "./_components/newletter";
import SpecialProducts from "./_components/specialproducts";
import BestSellingProducts from "./_components/bestsellings";
export default function Home() {
    return (
        <>
            <Offer />
            <Nav />
            <Hero />
            <SpecialProducts />
            <BestSellingProducts />
            <About />
            <NewsLetter />
            <Footer />
        </>
    );
}
