import { useEffect, useState, useMemo } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar } from "@mobiscroll/react";

function App() {
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://crm.supersiteuz.com/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  useEffect(() => {
    fetch("https://crm.supersiteuz.com/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const view = useMemo(() => {
    return {
      timeline: {
        type: "month",
        popower: true,
        currentTimeIndicator: true,
        timezones: ["Asia/Tashkent"],
      },
    };
  }, []);

  const resource = [];
  const events = [];

  orders.forEach((order) => {
    const newObj = {
      id: order.id,
      title: `${order.users[0]?.name} 
      ${order.users[0]?.phone}`,
      start: order.arrival_date,
      end: order.departure_date,
      color: "rgb(255,69,0)",
      resource: order.rooms.id,
      tooltip: `Комната : ${order.rooms.type} \nКоментарий: ${order.comentary}`,
    };
    events.push(newObj);
  });

  rooms.forEach((room) => {
    const newObj = {
      id: room.id,
      name: room.rooms,
      color: "ff4600",
    };
    resource.push(newObj);
  });
  console.log(events);
  console.log(resource);

  return (
    <Eventcalendar
      theme="ios"
      themeVariant="light"
      view={view}
      data={events}
      resources={resource}
    />
  );
}

export default App;
