import mongoose from "mongoose";
import specialists from "./data/specialists2.js";
import Specialist from "./models/specialistModel.js";
import fs from "fs";

console.log(specialists.length);
//BUG IN CONVERTING specialists2.js SPECIALTIES to specialists3.js. Aaron Gan M12447H
//BUG IN CONVERTING specialists3.js LOCATIONS to mongodb.
// var masterspeclist = [
//   "Anaesthesiology",
//   "Cardiology",
//   "Cardiothoracic Surgery",
//   "Dentistry",
//   "Dental Surgery",
//   "Dermatology",
//   "Diagnostic Radiology",
//   "Emergency Medicine",
//   "Endocrinology",
//   "Gastroenterology",
//   "General Surgery",
//   "Geriatric Medicine",
//   "Haematology",
//   "Hand Surgery",
//   "Infectious Diseases",
//   "Internal Medicine",
//   "Medical Oncology",
//   "Neurology",
//   "Neurosurgery",
//   "Nuclear Medicine",
//   "Obstetrics & Gynaecology",
//   "Occupational Medicine",
//   "Ophthalmology",
//   "Orthopaedic Surgery",
//   "Otorhinolaryngology/ENT",
//   "Paediatric Medicine",
//   "Paediatric Surgery",
//   "Pathology",
//   "Plastic Surgery",
//   "Psychiatry",
//   "Public Health",
//   "Radiation Oncology",
//   "Rehabilitation Medicine",
//   "Renal Medicine",
//   "Respiratory Medicine",
//   "Rheumatology",
//   "Urology",
// ];
// var mastersubspeclist = [
//   "Aviation Medicine",
//   "Intensive Care Medicine",
//   "Neonatology",
//   "Palliative Medicine",
//   "Sports Medicine",
//   "Paediatric Nephrology",
//   "Paediatric Cardiology",
//   "Paediatric Intensive Care",
//   "Paediatric Gastroenterology",
//   "Paediatric Haematology & Oncology"
// ]
// console.log(specialists.length);
// const lowercasemasterspec = masterspeclist.map((specialty) => {
//   return specialty.toLowerCase();
// });
function findUniqueValues(array) {
  const uniqueArray = [];
  array.forEach((item) => {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
}
const newspecialists = specialists.map((oldspec) => {
  var newspec = new Specialist();
  newspec.MCR = oldspec.mcr;
  newspec.name = oldspec.doctorName;
  console.log(newspec.name)
  newspec.image = oldspec.doctorImage;
  newspec.writeup = oldspec.doctorWriteup;
  newspec.qualifications = oldspec.doctorEducation
    .replace("[", "")
    .replace("]", "")
    .replace(/'/g, "");
  //newspec.designation = oldspec.designation;
  //newspec.gender = oldspec.gender;
  var myoldspecclinicname = [];
  var myoldspecclinicloc = [];
  var myoldspecclinichr = [];
  var myoldspecclinicphone = [];
  var mynewclinic = [];
  try {
    try{
      myoldspecclinicname = oldspec.clinicNames
      .replace("[", "")
      .replace("]", "")
      .split("', '");
    }catch(err){"clinicname", err}

    try{
      myoldspecclinicloc = oldspec.clinicAddresses
      .replace("[", "")
      .replace("]", "")
      //.replace(/'/g, "")
      .split("', '");
    } catch(err){"clinicloc", err.message}

    try{
      myoldspecclinichr = oldspec.clinicHours
      .replace("[", "")
      .replace("]", "")
      .split("', '");
    }catch(err){"clinichr", err.message}

    // myoldspecclinicphone = oldspec.clinicPhone
    //   .replace("[", "")
    //   .replace("]", "")
    //   .split("', '");
    for (let x = 0; x < myoldspecclinicname.length; x++) {
      var clinicinput = {
        clinicName: myoldspecclinicname[x].replace(/'/g, "").trim(),
        clinicAddress: myoldspecclinicloc[x].replace(/'/g, "").trim(),
        clinicHours: myoldspecclinichr[x].replace(/'/g, "").trim(),
       // clinicPhone: myoldspecclinicphone[x].replace(/'/g, "").trim(),
      };
      mynewclinic.push(clinicinput);
    }
    //console.log(mynewclinic);
    newspec.clinic = mynewclinic;
  } catch (err) {
    console.log("clinic:",oldspec.doctorName,":", err);
  }

  var myoldspeclanguages = [];
  var mynewlang = [];

  // Convert the Set back to an array (if needed)
  try {
    myoldspeclanguages = oldspec.doctorLanguage
      .replace("[", "")
      .replace("]", "")
      .split("', '");

    for (let x = 0; x < myoldspeclanguages.length; x++) {
      var myoldlanghere = myoldspeclanguages[x].replace(/'/g, "").trim();
      mynewlang.push(myoldlanghere);
    }
    var mynewlang2 = findUniqueValues(mynewlang);
    var mynewlang3 = [];
    for (let y = 0; y < mynewlang2.length; y++) {
      var mylanguage = {
        language: mynewlang2[y],
      };
      mynewlang3.push(mylanguage);
    }
    newspec.languages = mynewlang3;
  } catch (err) {
    console.log("lang:", err.message);
  }

  var myoldspecspecialty = [];
  var myoldspecsubspec = [];
  var myoldspecclinicalint = [];
  var mynewspec = [];
  var mynewsubspec = [];
  var mynewclinint = [];
  var mynewspec3 = [];
  var mynewsubspec3 = [];
  var mynewclinint3 = [];
  var mycombinedspec = [];
  try {
    myoldspecspecialty = oldspec.doctorSpecialty
      .replace("[", "")
      .replace("]", "")
      .split("', '");
    // var mynewspecarray = [];
    for (let x = 0; x < myoldspecspecialty.length; x++) {
      var myoldspechere = myoldspecspecialty[x].replace(/'/g, "").trim();
      mynewspec.push(myoldspechere);
    }
    var mynewspec2 = findUniqueValues(mynewspec);
    
    for (let y = 0; y < mynewspec2.length; y++) {
      var myspec = {
        specialty: mynewspec2[y],
      };
      mynewspec3.push(myspec);
    }
    //newspec.specialty.specialty = mynewspec3;
    try {
      if (oldspec.doctorSubSpecs) {
        myoldspecsubspec = oldspec.doctorSubSpecs
          .replace("[", "")
          .replace("]", "")
          .split("', '");
        for (let x = 0; x < myoldspecsubspec.length; x++) {
          var myoldsubspechere = myoldspecsubspec[x].replace(/'/g, "").trim();
          mynewsubspec.push(myoldsubspechere);
        }
        var mynewsubspec2 = findUniqueValues(mynewsubspec);
        
        for (let y = 0; y < mynewsubspec2.length; y++) {
          var mysubspec = {
            subspecialty: mynewsubspec2[y],
          };
          mynewsubspec3.push(mysubspec);
        }
      //  newspec.specialty.subspecialty = mynewsubspec3;
      }
    } catch (err) {
      console.log("subspec:",oldspec.doctorName,":",  err.message);
    }

    try {
      if (oldspec.doctorClinicalInterests) {
        myoldspecclinicalint = oldspec.doctorClinicalInterests
          .replace("[", "")
          .replace("]", "")
          .split("', '");
        for (let x = 0; x < myoldspecclinicalint.length; x++) {
          var myoldclininthere = myoldspecclinicalint[x]
            .replace(/'/g, "")
            .trim();
          mynewclinint.push(myoldclininthere);
        }
        var mynewclinint2 = findUniqueValues(mynewclinint);
        
        for (let y = 0; y < mynewclinint2.length; y++) {
          var myclinint = {
            clinicalinterest: mynewclinint2[y],
          };
          mynewclinint3.push(myclinint);
        }
//newspec.specialty.clinicalinterest = mynewclinint3;
      }
    } catch (err) {
      console.log("clinint:", err.message);
    }

    mynewspec3.forEach((spec) => {
      mycombinedspec.push({
          specialty: spec.specialty,
      });
    });

    // Push objects from subspecs array
    mynewsubspec3.forEach((subspec) => {
      mycombinedspec.push({
          subspecialty: subspec.subspecialty,
      });
    });

    // Push objects from clinint array
    mynewclinint3.forEach((clinintItem) => {
      mycombinedspec.push({
          clinicalinterest: clinintItem.clinicalinterest
      });
    });
    newspec.specialty = mycombinedspec
//    newspec.specialty = mynewspec;
  } catch (err) {
    console.log("spec:",oldspec.doctorName,":",   err.message);
  }

  var myoldspechosplocs = [];
  var myoldspechosplats = [];
  var myoldspechosplongs = [];
  var mynewhosplocs = [];
  try {
    try{
      myoldspechosplocs = oldspec.hospitalLocs
      .replace("[", "")
      .replace("]", "")
      .split("', '");
      
    }catch(err){"hosp1:",oldspec.doctorName,":",   err.message }

    try{
      myoldspechosplats = oldspec.latitudes
      .replace("[", "")
      .replace("]", "")
      .split("', '");
      myoldspechosplongs = oldspec.longitudes
      .replace("[", "")
      .replace("]", "")
      .split("', '");
    } catch(err){"long lat1:",oldspec.doctorName,":",   err.message}

    for (let x = 0; x < myoldspechosplocs.length; x++) {
      const myhosploc = {
        //        locationName: myoldspechosplocs[x].replace(/ *\([^)]*\) */g, "").trim(),
        locationName: myoldspechosplocs[x].replace(/'/g, "").trim(),
        locationLatitude: myoldspechosplats[x] ? myoldspechosplats[x].replace(/'/g, "").trim() : null,
        locationLongitude: myoldspechosplongs[x] ? myoldspechosplongs[x].replace(/'/g, "").trim() : null,
      };
      mynewhosplocs.push(myhosploc);
    }
    newspec.location = mynewhosplocs;
  } catch (err) {
    console.log("locs", oldspec.doctorName,":",  err.message);
  }

  var mynewinsurer = [];
  try {
    const myGE = oldspec.GEInteger;
    const mySingLife = oldspec.SinglifeInteger;
    const myAIA = oldspec.AIAInteger;
    const myPru = oldspec.PruInteger;
    const myIncome = oldspec.IncomeInteger;
    const myRaffles = oldspec.RafflesInteger;
    const myHSBC = oldspec.HSBCInteger;
    if (parseInt(myGE) === 1) {
      const myGEnow = {
        insurerName: "GE",
      };
      mynewinsurer.push(myGEnow);
    }
    if (parseInt(mySingLife) === 1) {
      const mySingLife = {
        insurerName: "Singlife",
      };
      mynewinsurer.push(mySingLife);
    }
    if (parseInt(myAIA) === 1) {
      const myAIA = {
        insurerName: "AIA",
      };
      mynewinsurer.push(myAIA);
    }
    if (parseInt(myPru) === 1) {
      const myPru = {
        insurerName: "Prudential",
      };
      mynewinsurer.push(myPru);
    }
    if (parseInt(myIncome) === 1) {
      const myIncome = {
        insurerName: "Income",
      };
      mynewinsurer.push(myIncome);
    }
    if (parseInt(myRaffles) === 1) {
      const myRaffles = {
        insurerName: "Raffles",
      };
      mynewinsurer.push(myRaffles);
    }
    if (parseInt(myHSBC) === 1) {
      const myHSBC = {
        insurerName: "HSBC",
      };
      mynewinsurer.push(myHSBC);
    }

    newspec.insurerPanel = mynewinsurer;
  } catch (err) {console.log("insurer:", oldspec.doctorName,":",  err.message);}
  return newspec;
});
console.log(newspecialists.length);

var arrayOfSortedObjects = Object.keys(newspecialists)
  .sort(function (a, b) {
    return newspecialists[a].name.localeCompare(newspecialists[b].name);
  })
  .map(function (k) {
    return newspecialists[k];
  });

console.log(arrayOfSortedObjects.length);
// // //console.log(newspecialists)
fs.writeFile(
  "./data/specialists3.js",

  JSON.stringify(arrayOfSortedObjects),

  function (err) {
    if (err) {
      console.error("Crap happens");
    }
  }
);

console.log("Done");
