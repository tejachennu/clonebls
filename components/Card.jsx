import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, ChevronRight } from 'lucide-react'

export default function Card() {
  const jurisdictions = [
    {
      name: "TORONTO JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the Consulate in Toronto",
      locations: [
        "Ontario (Except Applicants residing at Postal Code starting with letter K) Quebec (Except Applicants residing at Postal Codes starting with letters J, H, K)",
        "Manitoba",
        "New Brunswick",
        "Nova Scotia",
        "Prince Edward Island",
        "New foundland"
      ],
      icon: <Globe className="w-6 h-6 text-red-600" />
    },
    {
      name: "OTTAWA JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the High Commissioner in Ottawa",
      locations: [
        "National Capital Region of Ottawa- Hull",
        "Ontario (Applicants residing at postal code starting with K)",
        "Montreal (Quebec, applicant residing at postal code starting with J, H)",
        "Kingston, Cornwall, Hawkesbury, Arnprior, Renfrew, Perth, Prescott, Brockville, Carleton Place, Smith's Falls Morrisburg (all Ontario)",
        "Nunavut Territories"
      ],
      icon: <Globe className="w-6 h-6 text-red-600" />
    },
    {
      name: "VANCOUVER JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the Consulate in Vancouver",
      locations: [
        "Saskatchewan",
        "Alberta",
        "British Columbia",
        "Yukon Territory",
        "Northwest Territories"
      ],
      icon: <Globe className="w-6 h-6 text-red-600" />
    }
  ]

  return (
    <div className="bg-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jurisdictions.map((jurisdiction, index) => (
            <div key={index} className="flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {jurisdiction.icon}
                  <h2 className="ml-1 text-2xl font-bold text-red-900">{jurisdiction.name}</h2>
                </div>
                <p className="mb-4 text-gray-600">{jurisdiction.description}</p>
                <ul className="mb-6 space-y-2">
                  {jurisdiction.locations.map((location, locIndex) => (
                    <li key={locIndex} className="flex items-start">
                      <ChevronRight className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-red-600" />
                      <span className="text-gray-700">{location}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
              <Link 
                  href="#" 
                  className="inline-flex items-center justify-center px-4 py-2 m-4 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-full hover:bg-red-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}