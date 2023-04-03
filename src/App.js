import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./app.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Eventcalendar,
  CalendarNav,
  SegmentedGroup,
  SegmentedItem,
  CalendarPrev,
  CalendarToday,
  CalendarNext,
  Popup,
  Button,
  Input,
  Textarea,
} from "@mobiscroll/react";

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

function App() {
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("month");
  const [isOpen, setOpen] = useState(false);
  const [tempEvent, setTempEvent] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const [calView, setCalView] = useState({
    timeline: {
      type: "month",
    },
  });

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onEventClick = useCallback((args) => {
    setTempEvent({ ...args.event });
    setAnchor(args.domEvent.target);
    setOpen(true);
  }, []);


  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const data = {};
    const res = await fetch(
      "https://crm.supersiteuz.com/orders/" + tempEvent.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
    console.log(res);
  };

  const changeView = (event) => {
    let calView;

    switch (event.target.value) {
      case "year":
        calView = {
          timeline: {
            type: "year",
          },
        };
        break;
      case "week":
        calView = {
          timeline: {
            type: "week",
          },
        };
        break;
      case "month":
      default:
        calView = {
          timeline: {
            type: "month",
          },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };

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

  const resource = [];
  const events = [];

  orders.forEach((order) => {
    const newObj = {
      id: order.id,
      title: `${order?.users[0]?.name} \n${order.users[0]?.phone}`,
      start: order.arrival_date,
      description: order.comentary,
      allDay: false,
      end: order.departure_date,
      color: "#DA226F",
      status: order.status,
      resource: order.rooms.id,
      tooltip: `Имя: ${order.users[0]?.name} \nНомер телефона:${order.users[0]?.phone} \nКомната : ${order.rooms.type} \nКоментарий: ${order.comentary}`,
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

  const renderMyHeader = () => {
    return (
      <>
        <CalendarNav className="md-event-listing-nav" />
        <div className="md-event-listing-picker">
          <Link className="md-event-listing-link" to="/">
            + Добавить заявку
          </Link>
          <SegmentedGroup value={view} onChange={changeView}>
            <SegmentedItem value="year">Year</SegmentedItem>
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="month">Month</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-event-listing-prev" />
        <CalendarToday className="md-event-listing-today" />
        <CalendarNext className="md-event-listing-next" />
      </>
    );
  };

  return (
    <div>
      <Eventcalendar
        theme="ios"
        themeVariant="light"
        view={calView}
        data={events}
        renderHeader={renderMyHeader}
        resources={resource}
        cssClass="md-event-listing"
        onEventClick={onEventClick}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        isOpen={isOpen}
        anchor={anchor}
        responsive={responsivePopup}
      >
          <div className="mbsc-form-group">
            <Input label="Title" />
            <Textarea label="Description" />
          </div>
          <div className="mbsc-button-group">
            <Button className="mbsc-button-block" color="warning">
              Добавить гость
            </Button>
            <Button className="mbsc-button-block" color="primary">
              Выехал
            </Button>
          </div>
          <div className="mbsc-button-group">
            <Button
              className="mbsc-button-block"
              onClick={onClose}
              color="secondary-color"
            >
              close
            </Button>
            <Button className="mbsc-button-block" color="success" onClick={handleUpdate}>
              сохранять
            </Button>
          </div>
      </Popup>
    </div>
  );
}

export default App;
