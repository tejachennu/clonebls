import React from 'react';
import OCIApplicationForm from '../../../components/OCIApplicationForm';

const ServicePage = async ({ params }) => {
  const { id } = await params;  
  return (
    <OCIApplicationForm serviceId={id} />
  );
};

export default ServicePage;

export const generateStaticParams = async () => {
  return [
    { id: "PCC" },
    { id: "Passport-Renewal-Adult" },
    { id: "Passport-Renewal-Minor" },
    { id: "Passport-Surrender" },
    { id: "OCI-Adult-Indian-Origin" },
    { id: "OCI-Minor-Indian-Origin" }
  ];
};
