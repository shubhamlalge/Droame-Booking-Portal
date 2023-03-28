import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    
    
    booking_id:"",
    loc: "",
    shot_id: "",
    time: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const bookingshot = async (e) => {
    e.preventDefault();

    const { booking_id, loc, shot_id, time } = inpval;

    if (booking_id == "") {
        alert("booking_id is required");
      }
    if (loc == "") {
      alert("loc is required");
    } else if (shot_id == "") {
      alert("shot_id is required");
    } else if (time == "") {
      alert("time is required");
    } else {
      const res = await fetch("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            booking_id,
            loc,
            shot_id,
            time,
        })
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");
      } else {
        history.push("/")
        setUdata(data)
        console.log("data added");
      }
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              BookingId
            </label>
            <input
              type="text"
              value={inpval.booking_id}
              onChange={setdata}
              name="booking_id"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              location_id
            </label>
            <input
              type="text"
              value={inpval.loc}
              onChange={setdata}
              name="loc"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              drone_shot_id
            </label>
            <input
              type="number"
              value={inpval.shot_id}
              onChange={setdata}
              name="shot_id"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              created_time
            </label>
            <input
              type="date"
              value={inpval.time}
              onChange={setdata}
              name="time"
              class="form-control"
              id="exampleInputPassword1"
            />
          
         
          </div>

          <button type="submit" onClick={bookingshot} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
