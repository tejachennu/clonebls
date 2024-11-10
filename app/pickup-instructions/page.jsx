"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PicAndDropOff from '../../public/Images/pickandDropOff.png';
import MetaData from "@/components/MetaData";





const PickupDropPage = () => {
  const router = useRouter();

  const pickupDropoffMetaData = {
    metaTitle: "Pick Up and Drop Off Services - Affordable and Reliable Delivery | BLS International Services Canada",
    metaDescription: "Get reliable and affordable pick-up and drop-off services with BLS International Services Canada. We ensure hassle-free delivery at unbeatable prices.",
    metaKeywords: [
      "pick up and drop off services",
      "affordable delivery",
      "reliable consulate delivery",
      "BLS International Services Canada",
      "Indian consulate delivery services"
    ],
    ogUrl: `${process.env.NEXT_PUBLIC_PROD_URL}/pickup-instructions`,
    ogImage:`${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
    schemaData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BLS International Services Canada",
      "url": process.env.NEXT_PUBLIC_PROD_URL,
      "logo": "https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif", 
      "description": "BLS International Services Canada offers affordable and reliable pick-up and drop-off services for Indian consulate applications. We ensure smooth and hassle-free delivery.",
      "sameAs": [
        "https://www.facebook.com/BLSInternationalServicesCanada",
        "https://www.linkedin.com/company/bls-international-services-canada",
        "https://twitter.com/BLSIntlCanada"
      ]
    }
  };

  const services = [
    {
      title: "PICK UP AND DROP OFF",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU ARE SENDING FRESH APPLICATION TO BLS CENTER",
      image: PicAndDropOff, // Updated path for direct use from public folder
      alt: "Pick Up and Drop Off",
      type: "pickanddrop",
    },
    {
      title: "PICK UP",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU ARE SENDING ANY PENDING DOCUMENT",
      image: "/pickUp.png",
      alt: "Pick Up",
      type: "pickonly",
    },
    {
      title: "DROP OFF",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU WANT YOUR DOCUMENT TO BE DELIVERED AT YOUR ADDRESS",
      image: "/dropOff.png",
      alt: "Drop Off",
      type: "droponly",
    },
  ];

  return (
    <>
    <MetaData mData={pickupDropoffMetaData}/>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-center text-2xl font-bold text-orange-600 mb-8">
          BLS PICK AND DROP SERVICES
        </h1>
        <p className="text-center text-lg font-bold text-gray-800 mb-8">
          Get reliable pickup and drop-off services from us at 
          <span className="text-orange-500 font-extrabold"> Unbeatable </span> 
          prices. We ensure 
          <span className="text-orange-500 font-extrabold"> hassle-free </span> 
          and 
          <span className="text-orange-500 font-extrabold"> Affordable delivery</span>!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-6"
            >
              <Image
                src={service.image}
                alt={service.alt}
                width={150}
                height={200}
                className="w-full h-45 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
                onClick={() => router.push(`/pickup-drop?type=${service.type}`)}
              >
                Proceed
              </button>
            </div>
          ))}
          
      </div>
      <div className="text-black">
      <hr className="border-t-2 border-gray-300 w-1/2 mx-auto mb-6 mt-10" />
      <div className="p-6 max-w-5xl mx-auto font-sans leading-relaxed">
      <h2 className="text-xl text-red-800 font-semibold mb-4">Important Information:</h2>
      <p className="mb-4">
        <span className="font-bold">PICK-UP:</span> We’ll pick up your application package from your doorstep on the scheduled date. 
        Please make sure to include all documents, the application form, and the demand draft as listed in the checklist.
      </p>
      
      <p className="mb-4">
        <span className="font-bold">DROP-OFF (Return Courier):</span> Once processed by the consulate, we’ll send the documents back to your mailing address.
      </p>
      
      <p className="mb-4">
        <span className="font-bold">PICK-UP AND DROP-OFF (TOGETHER):</span> If this is your first time using BLS service, we’ll pick up the application from your doorstep and deliver the processed documents back to you.
      </p>
      
      <p className="mb-4">
        <span className="font-bold">PICK-UP (SEPARATE):</span> If you need to send any additional documents later, you can use this separate pick-up service.
      </p>
      
      <p className="mb-4">
        <span className="font-bold">DROP-OFF (SEPARATE):</span> If your application status says "Ready for collection," you can book this delivery service to get your documents sent to you.
      </p>
    </div>
      </div>
      </div> 
    </>
    
  );
};

export default PickupDropPage;