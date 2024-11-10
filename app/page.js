"use client"
import Card from "@/components/Card";
import TabbedInterface from "@/components/FeaturesSection";
import MetaData from "@/components/MetaData";
export default function Component() {
  const defaultMetadata = {
    metaTitle: "BLS International Services Canada - Your Trusted Partner for Indian Consulate Services",
    metaDescription: "BLS International Services Canada helps make the application process for the Indian consulate easy and efficient. Our team ensures a smooth experience with accurate and timely submissions for all your embassy-related needs.",
    metaKeywords: [
      "Indian consulate services",
      "BLS International Services Canada",
      "Indian embassy assistance",
      "embassy application support",
      "Canada Indian consulate help"
    ],
    ogUrl: `${process.env.NEXT_PUBLIC_PROD_URL}`,
    ogImage: `${process.env.NEXT_PUBLIC_PROD_URL}/images/default-og-image.jpg`,
    twitterImage: `${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BLS International Services Canada",
      "url": `${process.env.NEXT_PUBLIC_PROD_URL}`,
      "logo": `${process.env.NEXT_PUBLIC_PROD_URL}/images/logo.jpg`,
      "sameAs": [
        "https://www.facebook.com/BLSInternationalServicesCanada",
        "https://www.linkedin.com/company/bls-international-services-canada",
        "https://twitter.com/BLSIntlCanada"
      ],
      "description": "BLS International Services Canada specializes in providing services related to the Indian consulate, helping make the application process simple and efficient.",
      "contactPoint": {
        "@type": "ContactPoint",
        // "telephone": "+1-123-456-7890",
        "contactType": "Customer Service",
        "areaServed": "CA",
        "availableLanguage": ["English"]
      }
    }
  };
  return (
    <>
      <MetaData mData={defaultMetadata}/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <main className="container flex-grow px-4 py-8 mx-auto">
          <section className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold text-red-900">
              Welcome to BLS India Visa and Consular Services
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Filing applications for the Indian consulate can be challenging.
              We&apos;re here to simplify the process and ensure your application is
              submitted correctly. Let us assist you in making the consular
              process seamless.
            </p>
          <a
            href="/pickup-instructions"
            className=" text-lg border-red-900 border-2 text-black mt-10 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full  px-5 py-2.5 text-center mb-2 inline-flex items-center gap-2"
          >
            <img
              src="/images/CourierAnimation.gif"
              alt="delivery icon"
              className="w-12 h-12 object-contain"
            />
            Checkout our Courier pickup & drop service
          </a>
          </section>
          <Card />
        <h2 className=" text-center mt-24 text-4xl font-bold text-red-900">What we Offer?</h2>
        <TabbedInterface />
        <div className=" border-t border-b border-red-900 text-gray-500 px-6 py-3 mt-8" role="alert">
            <p className="font-bold">Please Note</p>
            <p className="text-sm">Please note, we are not affiliated with BLS. We are an independent entity providing assistance with BLS India Visa and Consular Services.</p>
          </div>
        </main>
      </div>
    </>
    
  );
}
