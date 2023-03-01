import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import datefiltericon from "../image/calendar.png";
import editicon from "../image/edit.png";
import addicon from "../image/add.png";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DateRangePicker } from "react-date-range";
import TodoChart from "../Charts/TodoChart";
const ListDisplay = () => {
  const [lists, setlists] = useState([]);
  const [Toggle, setToggle] = useState(false);
  const [allLists, setAllLists] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  var id = 0;
  var index = 0;
  const navigate = useNavigate();
  const deleteClicked = async (ide) => {
    let response = await fetch(`http://localhost:5000/api/deleteUser/${ide}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let respons = await fetch("https://backendtoto.vercel.app/api/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    respons = await respons.json();
    console.log(respons);
    setlists(respons[0]);
    console.log("deleteclicked");
  };

  const loadData = async () => {
    let response = await fetch("https://backendtoto.vercel.app/api/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    //console.log(response);
    //console.log(response);
    setlists(response[0]);
    setAllLists(response[0]);
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleSelect = (date) => {
    let filtered = allLists.filter((list) => {
      let listDate = new Date(list["date"]);
      return (
        listDate >= date.selection.startDate &&
        listDate <= date.selection.endDate
      );
    });
    // console.log(date.selection);
    //console.log(lists["name"]);
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setlists(filtered);
    console.log(filtered);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleToggle = () => {
    console.log("click");
    setToggle(!Toggle);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(lists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setlists(items);
  }

  return (
    <div className="justify-center">
      {/* <button onClick={handleToggle} style={{ display: "flex" }}>
        {" "}
        Filter by date
        <span>
          {" "}
          <img
            src={datefiltericon}
            style={{ width: "15px", height: "15px" }}
          ></img>{" "}
        </span>
      </button> */}
      <TodoChart />
      <div className="py-2 inline-flex ">
        <button
          onClick={handleToggle}
          style={{ display: "flex" }}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <img
            src={datefiltericon}
            style={{ width: "25px", height: "25px" }}
          ></img>
        </button>

        <Link
          to="/signup"
          style={{ display: "flex" }}
          type="button"
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <img src={addicon} style={{ width: "25px", height: "25px" }}></img>
        </Link>
      </div>
      {Toggle === true ? (
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      ) : (
        ""
      )}
      <h3 class="mb-4 font-semibold text-4xl text-gray-900 dark:text-white justify-content: center text-center">
        Todo list
      </h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map(
                ({ name, _id, iconurl, date, siteurl, note }, index) => {
                  return (
                    <Draggable key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <ul
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <li
                            className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                            style={{ height: "70px", borderRadius: " 15px" }}
                          >
                            <div
                              className="flex items-center pl-3"
                              style={{
                                justifyContent: "center",
                                flexGrow: "1",
                              }}
                            >
                              <input
                                onClick={() => deleteClicked(_id)}
                                id="vue-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                              ></input>
                              <label
                                style={{ display: "block" }}
                                for="vue-checkbox"
                                className="w-full py-3 ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                              >
                                <img
                                  className="rounded-full w-10 h-10"
                                  src={iconurl}
                                  alt="image description"
                                />
                              </label>

                              <label
                                style={{ display: "block" }}
                                for="vue-checkbox"
                                className="w-full py-3 ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
                              >
                                <a href={siteurl}> {name}</a>
                              </label>
                              <label
                                style={{ display: "block" }}
                                for="vue-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {note}
                              </label>
                              <label
                                style={{ display: "block" }}
                                for="vue-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {date.split("T")[0]}
                              </label>
                              <label
                                style={{ display: "block" }}
                                for="vue-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <Link
                                  to={`/edit/${_id}`}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  <img
                                    src={editicon}
                                    style={{ width: "25px", height: "25px" }}
                                  ></img>
                                </Link>
                              </label>
                            </div>
                          </li>
                        </ul>
                      )}
                    </Draggable>
                  );
                }
              )}{" "}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListDisplay;
