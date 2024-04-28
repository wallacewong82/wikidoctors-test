const specialists = [
  {
    name: "Dr Tan A B",
    image: "/images/pexels1.jpg",
    designation: "Consultant",
    writeup:
      "Dr Tan A B is a Consultant and Interventional Cardiologist with more than 15 years of clinical experience. Dr Ang has performed numerous invasive coronary angiography and percutaneous coronary interventions. His specialised interventional skill sets include complex left main coronary artery disease intervention, complex bifurcation coronary artery disease intervention and chronic total occlusion of coronary artery intervention. Dr Ang undertakes objective evaluation of diseased coronary artery using specialised physiological assessment tools, thereby preventing unnecessary placement of coronary artery stents.",
    qualifications: [
      {
        qualificationName: "MBBS",
        qualificationPlace: "NUHS",
        qualificationDate: "2002",
      },
    ],
    MCR: "12345S",
    specialty: "Cardiology",
    subspecialty: "Optical Coherence Tomography",
    languages: [
      {
        language: "English",
      },
      {
        language: "Mandarin",
      },
    ],
    gender: 0,
    clinic: [
      {
        clinicName: "H Street Cardio",
        clinicAddress: "#02-01 Gleneagles Medical Centre",
        clinicPhone: "+65 91255314",
        clinicHours: "Mon to Fri: 9am - 5pm, Sat: 9am - 1pm",
        clinicSite: "www.hstreetcardio.com.sg",
        clinicMail: "mail@hstreetcardio.com.sg",
      },
    ],
    location: [
      {
        locationName: "Gleneagles Hospital",
        locationAddress: "6A Napier Road, S124567",
      },
    ],
    insurerPanel: [
      {
        insurerName: "AIA",
        panelType: "Standard",
        panelBenefits: "PreAuth $10,000",
        panelJoinDate: new Date("2020/10/10"),
        panelEndDate: null,
      },
      {
        insurerName: "Great Eastern",
        panelType: "Privilege",
        panelBenefits: "Cashless $30,000",
        panelJoinDate: new Date("2021/01/09"),
        panelEndDate: null,
      },
    ],
  },
  {
    name: "Dr Woon B",
    image: "/images/pexels2.jpg",
    designation: "Snr Consultant",
    writeup:
      "presently a Senior Consultant in the Department of Pain Management under the Division of Anaesthesiology and Perioperative Medicine in SGH. She graduated with MBBS from the National University of Singapore, Yong Loo Lin School of Medicine in 2008. She subsequently pursued training in Anaesthesiology and became a fully certified specialist anaesthetist in 2015. She went on further to train in the subspecialty of chronic pain and regional anaesthesia, obtaining an European Diploma of Regional Anaesthesia in 2014 and completing a 1 year overseas HMDP fellowship in Perth, Sir Charles Gairdner Hospital, from 2016 to 2017, under the subspecialty of interventional and biopsychosocial pain management. She also graduated with a Masters of Clinical Investigation in 2017, which helped her pursue clinical and translational research in pain medicine and anaesthesiology. She does both clinical and basic science research in pain management. In addition, she is also currently attending the Graduate Diploma of Acupuncture course which she believes will help complement chronic pain management. She believes in the importance of a biopsychosocial and holistic approach in management of chronic pain.",
    qualifications: [
      {
        qualificationName: "MBBS",
        qualificationPlace: "NUHS",
        qualificationDate: "2002",
      },
      {
        qualificationName: "MMed",
        qualificationPlace: "University of Ediburgh",
        qualificationDate: "2012",
      },
    ],
    MCR: "43245A",
    specialty: "Anaesthesiology",
    subspecialty: "Perioperative Medicine",
    languages: [
      {
        language: "English",
      },
      {
        language: "Mandarin",
      },
      {
        language: "Bahasa Indonesia",
      }
    ],
    gender: 1,
    clinic: [
      {
        clinicName: "M Paediatrics",
        clinicAddress: "#02-44A Novena Medical Centre",
        clinicPhone: "+65 64345311",
        clinicHours: "Mon to Fri: 9am - 5pm, Sat: 9am - 1pm",
        clinicSite: "www.mpaeds.sg",
        clinicMail: "mail@mpaeds.sg",
      },
    ],
    location: [
      {
        locationName: "Gleneagles Hospital",
        locationAddress: "6A Napier Road, S124567",
      },
      {
        locationName: "Mount Elizabeth Novena Hospital",
        locationAddress: "12 Irrawaddy Road, S454322",
      },
    ],
    insurerPanel: [
      {
        insurerName: "AIA",
        panelType: "Standard",
        panelBenefits: "PreAuth $10,000",
        panelJoinDate: new Date("2020/10/10"),
        panelEndDate: null,
      },
      {
        insurerName: "Income",
        panelType: "Premium",
        panelBenefits: "Nil",
        panelJoinDate: new Date("2019/11/26"),
        panelEndDate: null,
      },
    ],
  },
];

export default specialists;
