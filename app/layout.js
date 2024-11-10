'use client';
import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Fotter";
import Cookies from 'js-cookie'; 

import MetaData from '@/components/MetaData';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// export const metadata={
//   title:"BLS Services",
//   description:"Visa services provided",
//   keywords:["BLS", "Visa"],
// };

export default function RootLayout({ children }) {
  const router = useRouter();
  const onRedirectCallback = (appState) => {
    Cookies.set('auth_state', 'authenticated', { expires: 7 }); // Cookie expires in 7 days
    router.push(appState?.returnTo || window.location.pathname);
  };

  
  return (
    <html lang="en">
      {/* <head>
        <meta name="description" content={ "Default description"} />
        <meta name="keywords" content={ "default, keywords, here"} />
        <meta name="author" content="Your Name or Organization" />

      </head> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
          redirectUri={process.env.NEXT_PUBLIC_ORIGIN}
          onRedirectCallback={onRedirectCallback}
          cacheLocation="localstorage"
          useRefreshTokens={true}
          authorizationParams={{
            scope: 'openid profile email',
            response_type: 'code',
            prompt: 'consent',
          }}
        >
          <section className="flex justify-center w-full bg-red-900">
            <Navbar />
          </section>
          {children}
          <section className="flex justify-center w-full bg-red-900">
            <Footer />
          </section>
        </Auth0Provider>
      </body>
    </html>
  );
}