import Nav from "../_components/nav";
import Offer from "../_components/offers";

export default function Offers() {
    return (
        <>
            <Offer />
            <Nav />
            <div className="h-screen w-full bg-amber-200 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl text-amber-600">NO OFFERS !</h1>
                    <h1 className="text-3xl text-amber-500">
                        No offers for regular customer's yet. check again after
                        some time.
                    </h1>
                </div>
            </div>
        </>
    );
}
