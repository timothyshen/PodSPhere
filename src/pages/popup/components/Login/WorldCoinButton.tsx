// import { IDKitWidget } from "@worldcoin/idkit";

// const WorldCoinButton = () => {
//     // TODO: need to fix world coin error on login
//     return (
//         <IDKitWidget
//             app_id="app_staging_1b187532a823cd20a957b452dd862df0" // obtained from the Developer Portal
//             action="vote_1" // this is your action name from the Developer Portal
//             signal="user_value" // any arbitrary value the user is committing to, e.g. a vote
//             onSuccess={() => {
//                 console.log("success")
//             }}
//             enableTelemetry
//         >
//             {({ open }) =>
//                 <button
//                     className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
//                     onClick={open}>
//                     Verify with World ID
//                 </button>}
//         </IDKitWidget>

//     )
// }

// export default WorldCoinButton