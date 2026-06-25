import React from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { INITIAL_EVENTS, createEventId } from "./event-utils";
import AddEvent from "./event.jsx";
import "./index.css";

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      showForm: false,
      id: 0,
    };
  }

  render() {
    return (
      <div className="demo-app">
        
        {this.renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            ref={this.calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            AddEvent={this.addEvent}
          />
        </div>
      </div>
    );
  }
  renderSidebar() {
    return (
      <>
        <div className="demo-app-sidebar">
          <div className="demo-app-sidebar-section">
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className="demo-app-sidebar-section">
            <label>
              <input type="checkbox" checked={this.state.weekendsVisible} onChange={this.handleWeekendsToggle}></input>
              toggle weekends
            </label>
          </div>
          <button onClick={() => this.setState({ showForm: true, selectedDate: "" })}>Add Event</button>
          {this.state.showForm && (
            <AddEvent
              key={this.state.selectedDate}
              initialDate={this.state.selectedDate}
              onAddEvent={this.handleAddEvent}
              onCancel={() => this.setState({ showForm: false })}
            />
          )}
        </div>
      </>
    );
  }

  handleAddEvent = ({ title, date, exercises }) => {
    const calendarApi = this.calendarRef.current.getApi;
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: date,
      allDay: true,
      extendedProps: { exercises },
    });

    this.setState({ showForm: false, selectedDate: "" });
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    console.log("event change");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    const dateOnly = selectInfo.startStr.split("T")[0];
    this.setState({ showForm: true, selectedDate: dateOnly });
  };

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}
function renderEventContent(info) {
  return (
    <>
      <b>{info.timeText}</b>
      <i>{info.event.title}</i>
      {info.event.extendedProps?.exercises?.map((ex, i) => (
        <div key={i}>
          {" "}
          {ex.name} - Sets: {ex.sets} - Reps: {ex.reps}
        </div>
      ))}
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}</b>
      <i>{event.title}</i>
    </li>
  );
}
