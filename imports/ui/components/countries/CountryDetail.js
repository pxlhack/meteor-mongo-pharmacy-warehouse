// import React, {useState, useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// import {getCountryById} from "../../api/endpoints/countries";
// import ManufacturersForCountry from "./ManufacturersForCountry";
//
// function CountryDetail() {
//     const [country, setCountry] = useState(null);
//     const {id} = useParams();
//
//     useEffect(() => {
//         async function fetchCountry() {
//             try {
//                 const data = await getCountryById(id);
//                 setCountry(data);
//             } catch (error) {
//                 // Handle error
//             }
//         }
//
//         fetchCountry();
//     }, [id]);
//
//     return (
//         <div>
//             {country ? (
//                 <div>
//                     <h3 style={{marginLeft: 10}}>{country.name}</h3>
//                     <div>{<ManufacturersForCountry/>}</div>
//                 </div>
//             ) : (
//                 <p>Loading country data...</p>
//             )}
//         </div>
//     );
// }
//
// export default CountryDetail;
