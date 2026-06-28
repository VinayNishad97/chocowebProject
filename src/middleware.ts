import withAuth from "next-auth/middleware";

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized: ({ token, req }) => {
            console.log("tokenn", token);

            if (req.nextUrl.pathname.startsWith("/admin")) {
                return token?.role == "admin";
            } else {
                return true;
            }
        },
    },
});

export const config = {
    matcher: ["/admin(/.*)?"],
};
