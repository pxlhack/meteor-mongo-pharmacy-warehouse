// import {getManufacturersList} from "../../api/endpoints/countries";
// import {useEffect, useState} from "react";
// import {useParams} from "react-router-dom";
//
// function ManufacturersForCountry() {
//     const [manufacturers, setManufacturers] = useState([]);
//     const {id} = useParams();
//
//     useEffect(() => {
//         async function fetchManufacturersList() {
//             try {
//                 const data = await getManufacturersList(id);
//                 setManufacturers(data);
//             } catch (error) {
//                 // Handle error
//             }
//         }
//
//         fetchManufacturersList();
//     }, []);
//
//     return (
//         <div>
//             {manufacturers.length > 0 ? (
//                 <div>
//                     <h2>List of Countries</h2>
//                     <ul>
//                         {manufacturers.map(manufacturer => (
//                             <li key={manufacturer.id}>
//                                 <h3>{manufacturer.name}</h3>
//                                 <p>ID: {manufacturer.id}</p>
//                                 <p>countryId: {manufacturer.countryId}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ) : (
//                 <p>Loading country data...</p>
//             )}
//         </div>
//     );
//
// }
//
// export default ManufacturersForCountry;
