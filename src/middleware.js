export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/kitchen",
    "/dashboard/category",
    "/dashboard/order",
    "/dashboard/product",
  ],
};







// const jwt = require("jsonwebtoken");
// const { NextResponse } = require("next/server");

// export async function middleware(req) {
//   let token = req.headers.authorization;
//   console.log("Token:", token);

//   if (!token) {
//     console.log("Token is not provided");
//     return NextResponse.redirect(new URL("/dashboard/login", req.url));
//   }

//   try {
//     const decoded = await new Promise((resolve, reject) => {
//       jwt.verify(token, "samurai", (err, decoded) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(decoded);
//         }
//       });
//     });

//     // Token is valid, proceed
//     console.log("Decoded Token:", decoded);

//     // Use axiosInstance for making requests in the middleware
//     const response = await axiosInstance.get('your_api_endpoint_here');
//     console.log("API Response:", response.data);

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return NextResponse.redirect(new URL("/dashboard/login", req.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/dashboard/kitchen",
//     "/dashboard/category",
//     "/dashboard/order",
//     "/dashboard/product",
//   ],
// };
