import { HubConnectionBuilder } from "@microsoft/signalr";

const getToken = () => {
  const token = `Bearer ${localStorage.getItem("token") ?? ""}`;
  return token ? token : "";
};

const connection = new HubConnectionBuilder()
  .withUrl("http://192.168.4.147:8007/notificationHub", {
    accessTokenFactory: () => getToken(),
    withCredentials: false,
  })
  .withAutomaticReconnect()
  .build();

// connection.on("ReceiveNotification", (responseDTO) => {
//   console.log("Notification received: ", responseDTO);
// });

connection.onclose((error) => {
  if (error) {
    console.error("SignalR Connection Error: ", error);
  } else {
    console.log("SignalR Connection closed");
  }
});

connection
  .start()
  .then(() => console.log("Connected to SignalRNotify"))
  .catch((err) => console.error("SignalR Connection Error: ", err));

export default connection;
