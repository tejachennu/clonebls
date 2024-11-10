import MetaData from '@/components/MetaData';
import Image from 'next/image'

export default function Component() {
  const aboutMetaData = {
    metaTitle: "About Us - BLS International Services Canada | Trusted Partner for Indian Consulate Services",
    metaDescription: "Learn more about BLS International Services Canada. We specialize in providing reliable and efficient services for Indian consulate applications, making your embassy experience seamless.",
    metaKeywords: [
      "about BLS International Services Canada",
      "Indian consulate services",
      "Indian embassy support",
      "embassy application services",
      "Canadian consulate assistance"
    ],
    ogUrl: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
    // ogImage: `${process.env.NEXT_PUBLIC_PROD_URL}/path/to/about-page-image.jpg`,
    schemaData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BLS International Services Canada",
      "url": process.env.NEXT_PUBLIC_PROD_URL,
      // "logo": `${process.env.NEXT_PUBLIC_PROD_URL}/path/to/your-logo.jpg`,
      "description": "BLS International Services Canada provides reliable services for individuals and businesses applying to the Indian consulate, ensuring a smooth and efficient experience.",
      "sameAs": [
        "https://www.facebook.com/BLSInternationalServicesCanada",
        "https://www.linkedin.com/company/bls-international-services-canada",
        "https://twitter.com/BLSIntlCanada"
      ]
    }
  };
  


  return (
    <>
    <MetaData mData={aboutMetaData}/>
      <div className="container px-4 py-16 mx-auto">
      <div className="grid items-center grid-cols-1 gap-8 mb-16 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-4xl font-bold">Your Trusted Embassy Partner</h2>
          <p className="mb-6 text-gray-600">
            At BLS International Services Canada, we specialize in providing comprehensive services related to the Indian embassy, ensuring a smooth experience for our clients.
          </p>
          <button className="px-6 py-2 text-white transition duration-300 bg-black rounded-full hover:bg-gray-800">
            Contact
          </button>
        </div>
        <div className="relative h-64 md:h-96">
          <Image
            src="/indiacanada2.jpg"
            alt="Crowd with Indian flag"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <div className="relative z-10 w-full h-64 md:h-80 md:w-3/4">
            <Image
              src="/indiacanada1.jpg"
              alt="Indian Embassy building"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-48 md:h-64 md:w-1/2">
            <Image
              src="/indiacanada2.jpg"
              alt="Hands joined on tree trunk"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="mb-4 text-4xl font-bold">Who We Are</h2>
          <p className="text-gray-600">
            Our dedicated team is committed to assisting you with all your needs regarding the Indian embassy, making the process efficient and hassle-free.
          </p>
        </div>
      </div>
    </div>
    </>
    
  )
}