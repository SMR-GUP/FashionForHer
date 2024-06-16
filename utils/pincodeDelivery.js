
const map=new Map();
    map.set("11",2)
    map.set("12",2),
    map.set("13",2),
    map.set("14",2),
    map.set("15",3),
    map.set("16",3),
    map.set("17",3),
    map.set("20",2),
    map.set("21",2),
    map.set("22",2),
    map.set("23",2),
    map.set("24",2),
    map.set("25",2),
    map.set("26",2),
    map.set("27",2),
    map.set("28",1),
    map.set("30",2),
    map.set("31",2),
    map.set("32",2),
    map.set("33",2),
    map.set("34",2),
    map.set("36",3),
    map.set("37",3),
    map.set("38",3),
    map.set("39",3),
    map.set("40",3),
    map.set("41",3),
    map.set("42",3),
    map.set("43",3),
    map.set("44",3),
    map.set("45",2),  
    map.set("46",2),
    map.set("47",2),
    map.set("48",2),
    map.set("49",3),
    map.set("57",4),
    map.set("58",4),
    map.set("59",4),
    map.set("56",4),
    map.set("70",3),
    map.set("71",3),
    map.set("72",3),
    map.set("73",3),
    map.set("74",3),  
    map.set("80",3),
    map.set("81",3),
    map.set("82",3),
    map.set("83",3),
    map.set("84",3),
    map.set("50",4),
    map.set("67",4),
    map.set("68",4),
    map.set("69",4)
   
  const getPincodeDeliveryDays= (pincode) => {

    if(pincode.length!==6)
      {
        return 0;
      }
    const mapPrefix = pincode.slice(0, 2);
    const value=map.get(mapPrefix);
    if(value!=undefined)
        return value;
    return 0;
  };


  

export default getPincodeDeliveryDays;
