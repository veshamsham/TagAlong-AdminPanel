import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const Switches = React.lazy(() => import("./views/Base/Switches"));
const Tables = React.lazy(() => import("./views/Base/Tables"));
const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));

const Charts = React.lazy(() => import("./views/Charts"));

const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));

const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));

//admin route import
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const ActivityLog = React.lazy(() => import("./views/ActivityLog"));
const Approval = React.lazy(() => import("./views/Approval"));
const Rides = React.lazy(() => import("./views/Rides/rides"));
const Transaction = React.lazy(() => import("./views/Transaction/transaction"));
const UserDocuments = React.lazy(() =>
  import("./views/UserDocuments/documents")
);

const inspectionDetails = React.lazy(() =>
  import("./views/InspectionApproval/inspection-details")
);

const userDetails = React.lazy(() =>
  import("./views/UserDetails/user-details")
);

const driverList = React.lazy(() =>
  import("./views/DriverList/DriverList")
);

const ridersList = React.lazy(() =>
  import("./views/RidersList/RidersList")
);

const driverDetails = React.lazy(() =>
  import("./views/DriverDetails/ride-detail")
);

const passengerDetails = React.lazy(() =>
import("./views/PassengerDetails/passenger-ride-detail")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  //admin route
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/activity", name: "ActivityLog", component: ActivityLog },

  { path: "/approvallist", name: "Approval", component: Approval },
  {
    path: "/inspection-detail",
    name: "Inspection-Detail",
    component: inspectionDetails
  },
  {
    path: "/user-detail",
    name: "user-Detail",
    component: userDetails
  },
  {
    path: "/ride-detail",
    name: "ride-detail",
    component: driverDetails
  },
  {
    path: "/passenger-ride-detail",
    name: "passenger-ride-detail",
    component: passengerDetails
  },
  {
    path: "/driver-ride-list",
    name: "Drivers",
    component: driverList
  },
  {
    path: "/passenger-ride-list",
    name: "Riders",
    component: ridersList
  },
  
  { path: "/rides", name: "Rides", component: Rides },
  { path: "/transaction", name: "Transaction", component: Transaction },
  { path: "/user-documents", name: "Documents", component: UserDocuments },

  { path: "/", exact: true, name: "", component: DefaultLayout },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User }
];

export default routes;
