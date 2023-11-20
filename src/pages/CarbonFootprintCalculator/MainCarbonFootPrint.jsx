// import React from "react";
// import "./carbonStyle/carbonStyle.css";
// import Select from "react-select";
// import { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// export const MainCarbonFootPrint = () => {
//   return(
//     <>
//     <PersonalizeStep1/>
//     <TypeofvehicleStep2/>
//     </>
//   )
// };


// const PersonalizeStep1 = () =>{
//   return (
//     <div>
//       <div
//         className="col-9 justify-content-center mx-auto"
//         style={{ border: "1px solid red" }}
//       >
//         <div className="d-flex align-items-center">
//           <div>
//             <img src="/modelUn/VectorCarbon.png" alt="" />
//           </div>
//           <div className="px-2">
//             <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
//               Carbon Footprint Calculator
//             </span>
//           </div>
//         </div>

//         <div className="text-center mt-5">
//           <div>
//             <div>
//               <span className="fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
//                 Personalize{" "}
//               </span>
//             </div>
//             <div className="mt-4">
//               <span className="fw-600-fs-32px">
//                 Please specify your residential area
//               </span>
//             </div>
//           </div>

//           <div>
//             {/* <Swiper spaceBetween={30} slidesPerView={1} loop={false}> */}
//               <div className="mt-4 row">
//                 {residental?.map((ele) => {
//                   return (
//                     <>
//                       <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//                         <div
//                           className="d-flex py-3 flex-column text-center justify-content-between"
//                           style={{ height: "221px" }}
//                         >
//                           <div>
//                             <img className="" src={ele.img} alt="" />
//                           </div>

//                           <div>
//                             <div className="d-flex justify-content-center">
//                               <div className="">
//                                 <input type="radio" name="" id="" />
//                               </div>
//                               <div className="px-2">
//                                 <span>{ele.area}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>
//             {/* </Swiper> */}
//           </div>
            
           

            
//         </div>
//       </div>
//     </div>
//   );
// } 


// const TypeofvehicleStep2 = () =>{
//   return(
//     <div>
//          {/* Please specify type of vehicle */}
//          <div className="col-9  mx-auto">
//             <div>
//               <div>
//                 <span className="fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
//                   Transportation{" "}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <span className="fw-600-fs-32px">
//                   Please specify type of vehicle
//                 </span>
//               </div>
//             </div>
//             <div className="mt-2   d-flex align-items-center">
//               <div>
//                 <input type="radio" name="" id="" />
//               </div>
//               <div className="px-2">
//                 <span
//                   className="fw-600 fs-24px br-12-5px"
//                   style={{ color: "#303030" }}
//                 >
//                   Car
//                 </span>
//               </div>
//             </div>
//             <div className="d-flex align-items-center">
//               <div>
//                 <input type="radio" name="" id="" />
//               </div>
//               <div className="px-2">
//                 <span
//                   className="fw-600 fs-24px br-12-5px"
//                   style={{ color: "#303030" }}
//                 >
//                   Motercycle
//                 </span>
//               </div>
//             </div>
//             <div className="d-flex align-items-center">
//               <div>
//                 <input type="radio" name="" id="" />
//               </div>
//               <div className="px-2">
//                 <span
//                   className="fw-600 fs-24px br-12-5px"
//                   style={{ color: "#303030" }}
//                 >
//                   Public Transportation (bus, train, etc.)
//                 </span>
//               </div>
//             </div>
//           </div>
//     </div>
//   )
// }


// const VehicleDetailStep3 = () =>{
//   return(
//     <div>
//           {/* Please specify a vehicle Details */}
//           <div className="col-12 justify-content-center mx-auto">
//             <div>
//               <div>
//                 <span className="fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
//                   Transportation{" "}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <span className="fw-600-fs-32px">
//                   Please specify a vehicle Details (If Applicable)
//                 </span>
//               </div>
//             </div>
            
//               <form>
//             <div className="row">
//               {/* Car Brand */}
//               <div className="col-12 col-lg-6">
//             <div className="">
//               <div><span className="fw-400 fs-21px">Car Brand</span></div>
//               <div className="col-7">
//               <Select
//               options={carBrand}
//               defaultValue={carBrand[0]}
//               getOptionLabel={(option) => {
//                 return (
//                   <>
//                     <div className="p-2">
//                       <span className="color-purple fs-17px fw-semibold text-center">
//                         {option.name}
//                       </span>
//                     </div>
//                   </>
//                 );
//               }}
//               />
//               </div>
//             </div>
//               </div>

//               {/* <div> */}
//               {/* model */}
//               <div className="col-12 col-lg-6">
//               <div style={{border: "1px solid"}}><span className="fw-400 fs-21px">Model</span></div>
//               <div className="col-7"  style={{border: "1px solid"}}>
//               <Select
//               options={model}
//               defaultValue={model[0]}
//               getOptionLabel={(option) => {
//                 return (
//                   <>
//                     <div className="p-2">
//                       <span className="color-purple fs-17px fw-semibold text-center">
//                         {option.name}
//                       </span>
//                     </div>
//                   </>
//                 );
//               }}
//               />
//               </div>
//             </div>

//                 {/* fuel */}
//               <div className="col-12 col-lg-6">
//               <div><span className="fw-400 fs-21px">Fuel Type</span></div>
//               <div className="col-7">
//               <input style={{background: "#F9F9F9"}} className="input-handle" type="text" placeholder="petrol"/>
//               </div>
//             </div>

//               {/* km */}
//             <div className="col-12 col-lg-6">
//               <div><span className="fw-400 fs-21px">Fuel Efficiency (in km/l or km/kWh)</span></div>
//               <div className="col-7">
//               <input style={{background: "#F9F9F9"}} className="input-handle" type="number" placeholder="20"/>
//               </div>
//             </div>
//             </div>
//               </form>


            
//           </div>
//     </div>

//   )
// }

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     width: "200px",
//     // padding: "3px",
//     border: "none",
//     background: "#a2a2a221",
//     color: "black",
//     // boxShadow:'none'
//   }),
// };
// const customStylesPurple = {
//   control: (provided) => ({
//     ...provided,
//     width: "170px",
//     padding: "",
//     border: "none",
//     background: "#F1EBFF",
//     textAlign: "center",
//     height: "37px",
//     // boxShadow:'none'
//   }),
// };
// const customStylesNumber = {
//   control: (provided) => ({
//     ...provided,
//     padding: "5px 0  ",
//     border: "none",
//     background: "#F1EBFF",
//     color: "#4A00E8",
//     width: "100&",
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     boxShadow: "none",
//     borderRadius: "10px",
//   }),
// };

// const carBrand = [
//   {
//     value: 1,
//     name: "Hyundai",
//   },
//   {
//     value: 2,
//     name: "Hyundai",
//   },
//   {
//     value: 3,
//     name: "Hyundai",
//   },
// ];

// const model = [
//   {
//     name: "Venue SX(O)",
//   },
//   {
//     name: "Venue SX(O)",
//   },
//   {
//     name: "Venue SX(O)",
//   },
// ];

// const fuelType = [
//   {
//     name: "Petrol",
//   },
//   {
//     name: "Petrol",
//   },
//   {
//     name: "Petrol",
//   },
// ];

// const FuelEfficiency = [
//   {
//     name: "20",
//   },
//   {
//     name: "21",
//   },
//   {
//     name: "23",
//   },
// ];

// const residental = [
//   {
//     img: "/modelUn/YoungmanOrderingTaxi.png",
//     area: "Urban",
//   },
//   {
//     img: "/modelUn/Travelnaturalplaces.png",
//     area: "Rural",
//   },
// ];
