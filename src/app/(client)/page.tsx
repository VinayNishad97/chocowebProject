import Hero from "./_components/hero";
import Nav from "./_components/nav";
import Offer from "./_components/offers";
import Footer from "./_components/footer";
import About from "./_components/about";
import NewsLetter from "./_components/newletter";
import SpecialProducts from "./_components/specialproducts";
export default function Home() {
    return (
        <>
            <Offer />
            <Nav />
            <Hero />
            <About />
            <SpecialProducts />
            <NewsLetter />
            <Footer />
        </>
    );
}
