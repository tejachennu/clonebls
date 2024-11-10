// "use client";

// import CheckOut from '@/components/CheckOut';
// import axios from 'axios';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { Loader, AlertCircle } from 'lucide-react'; // Example icons
// import { decodeMessage } from '@/utils/decoder';

// function Page() {
//   const searchParams = useSearchParams();
//   const formId = searchParams.get('formid');
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   var decryptedId = decodeMessage(formId);


//   useEffect(() => {
//     const fetchFormData = async () => {
//       if (!decryptedId) return; // Prevents making a request if formId is not provided
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/pdform/${decryptedId}`);
//         console.log(response);
//         setFormData(response.data.data);
//       } catch (err) {
//         console.error('Error fetching form data:', err);
//         setError('Failed to load form data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFormData();
//   }, [decryptedId]); // Added formId as a dependency to trigger the effect when it changes

//   return (
//     <div className='flex items-center justify-center w-full min-h-screen bg-[#F4E3B8]'>
//       {loading ? (
//         <div className="flex items-center justify-center h-40">
//           <Loader className="animate-spin" size={24} />
//           <p className="ml-2">Loading...</p>
//         </div>
//       ) : error ? (
//         <div className="flex items-center justify-center h-40 text-red-500">
//           <AlertCircle size={24} />
//           <p className="ml-2">{error}</p>
//         </div>
//       ) : (
//         formData ? (
//           <CheckOut formData={formData} mode={formData.serviceType} cost={formData.cost} />
//         ) : (
//           <p className="mt-4 text-center">No data available.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Page;
"use client";

import CheckOut from '@/components/CheckOut';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { decodeMessage } from '@/utils/decoder';

function CheckOutPageContent() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('formid');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const decryptedId = decodeMessage(formId);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!decryptedId) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/pdform/${decryptedId}`);
        setFormData(response.data.data);
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [decryptedId]);

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-[#F4E3B8]'>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          {/* <Loader className="animate-spin" size={24} /> */}
          <p className="ml-2">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-40 text-red-500">
          <AlertCircle size={24} />
          <p className="ml-2">{error}</p>
        </div>
      ) : (
        formData ? (
          <CheckOut formData={formData} mode={formData.serviceType} cost={formData.cost} />
        ) : (
          <p className="mt-4 text-center">No data available.</p>
        )
      )}
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckOutPageContent />
    </Suspense>
  );
}

export default Page;
