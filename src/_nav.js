/* eslint-disable prettier/prettier */
// let userData = JSON.parse(localStorage.getItem("userData"))
console.log("UserData " + localStorage.getItem("userType"));
// console.log('loggedInUserId '+ localStorage.getItem('loggedInUserId'));

let userType = localStorage.getItem("userType");
var itemsArray = [];

if (userType === "4") {
  itemsArray.push({
    name: "Approval",
    url: "/approvallist"
  });
} else {
  itemsArray.push(
    {
      name: "Dashboard",
      url: "/dashboard"
    },
    {
      name: "Activity Log",
      url: "/activity"
    },
    {
      name: "Driver Rides list",
      url: "/driver-ride-list"
    },
    {
      name: "Passenger Rides list",
      url: "/passenger-ride-list"
    }
  );
}

export default {
  items: itemsArray
};
