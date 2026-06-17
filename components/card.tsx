import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function Cardd({
    cardcontent,
    cardfooter,
}: {
    cardcontent: any;
    cardfooter: any;
}) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{cardfooter}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{cardcontent}</p>
                </CardContent>
                <CardFooter>
                    <p>{cardfooter}</p>
                </CardFooter>
            </Card>
        </>
    );
}
