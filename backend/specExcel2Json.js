// To run this, make sure the excel file exists in target folder. Then, run in /backend the following command: 'node specExcel2Json.js'.
// After running, the file will be saved in /data/specialists2.js, which needs another 3 steps to map to the proper schema.
// 1st step: In /data/specialists2.js, make sure to change to "const specialists = [...]" format, instead of the stringify format provided. Make sure to remove "ExportFinal" tags, else it becomes a 1 by 1 array. Also add "'export default specialists;' at the bottom" Can press Ctrl + Shift + I to reorg the format.
// 2nd step: map to /data/specialists3.js using specJson2Json.js. Run that, and the data will feed properly to specialists3.js
// 3rd step: again, clean up the specialist json mapping in specialists3.js, and finally run seeder.js

import excelToJson from 'convert-excel-to-json';
import fs from 'fs';

const result = excelToJson({
    // sourceFile: "/home/wallace/Desktop/specialistscraper/ge-singlife-v3.xlsx",
    sourceFile: "/home/wallace/Desktop/specialistscraper/DoctorDatabase27Apr2024Final.xlsx", 
    header:{
        rows:1
    }, 
    sheets:['ExportFinal'],
    columnToKey:{
        A: 'mcr', 
        B: 'AIAInteger',
        C: 'PruInteger',
        D: 'SinglifeInteger', 
        E: 'IncomeInteger', 
        F: 'GEInteger', 
        G: 'RafflesInteger', 
        H: 'HSBCInteger',
        I: 'doctorName',
        X: 'doctorImage', //still need to download images, then reupload them from my server (instead of loading directly from the other sites)
        J: 'doctorLanguage',
        K: 'doctorSpecialty',
        L: 'doctorSubSpecs', 
        M: 'doctorClinicalInterests',
        N: 'doctorWriteup',
        O: 'clinicNames',
        P: 'clinicAddresses',
        Q: 'clinicHours',
        R: 'doctorEducation',
        S: 'hospitalLocs',
        T: 'latitudes',
        U: 'longitudes',
        V: 'panelType',
        W: 'clinicPhone'
    }
});

fs.writeFile('./data/specialists2.js', JSON.stringify(result), (err)=>{
    if(err){
        console.log('err')
    } 
    console.log("File saved");
})


//console.log(result)
