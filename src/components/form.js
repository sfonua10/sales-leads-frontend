import React, { useReducer } from "react";
import us_states from "../statesinusa";

const INITIAL_STATE = {
  name: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  preferredContactMethod: "",
  status: "IDLE",
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "updateStatus":
      return { ...state, status: action.status };
    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  const updateFieldValue = (field) => (event) => {
    // setFieldValue((fieldValue[field] = event.target.value));
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const validateForm = () => {
    let fields = state;
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      state.errors["name"] = "*Please enter your name.";
    }

    if (fields["name"] !== "") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        state.errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["phone"]) {
      formIsValid = false;
      state.errors["phone"] = "*Please enter your phone number.";
    }

    if (fields["phone"] !== "") {
      if (!fields["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        state.errors["phone"] = "*Please enter valid phone number.";
      }
    }
    if (!fields["city"]) {
      formIsValid = false;
      state.errors["city"] = "*Please enter your city.";
    }

    if (!fields["state"]) {
      formIsValid = false;
      state.errors["state"] = "*Please select your state.";
    }

    if (!fields["zip"]) {
      formIsValid = false;
      state.errors["zip"] = "*Please enter valid zip.";
    }

    if (!fields["preferredContactMethod"]) {
      formIsValid = false;
      state.errors["preferredContactMethod"] =
        "*Please select preferred contact method.";
    }

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("PENDING");
    if (validateForm()) {
      onSubmit();
      fetch("http://localhost:7777/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((res) => res.json())
        .then((res) => {
          setStatus("SUCCESS");
        })
        .catch((error) => {
          console.error(error);
          setStatus("ERROR");
        });
    }
  };

  if (state.status === "SUCCESS") {
    return (
      <div>
        <p
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          Lead Submitted!
          <button
            type="reset"
            onClick={() => dispatch({ type: "reset" })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
          >
            Reset
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      {state.status === "ERROR" && (
        <p
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          Something went wrong. Please try again.
        </p>
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-gray-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-3 text-2xl">Add Lead</h1>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadName"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              id="leadName"
              type="text"
              name="name"
              value={state.name}
              onChange={updateFieldValue("name")}
            />
            {state.errors.name && state.name === "" && (
              <p className="text-red-500 text-xs italic">{state.errors.name}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadPhone"
            >
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              id="leadPhone"
              type="phone"
              name="phone"
              value={state.phone}
              onChange={updateFieldValue("phone")}
            />
            {state.errors.phone && state.phone === "" && (
              <p className="text-red-500 text-xs italic">
                {state.errors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadCity"
            >
              City
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              id="leadCity"
              type="text"
              name="city"
              value={state.city}
              onChange={updateFieldValue("city")}
            />
            {state.errors.city && state.city === "" && (
              <p className="text-red-500 text-xs italic">{state.errors.city}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadState"
            >
              State
            </label>
          </div>
          <div className="relative md:w-2/3">
            <select
              id="leadState"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              name="body"
              value={state.state}
              onChange={updateFieldValue("state")}
            >
              <option value="" disabled hidden>
                --Please choose an option--
              </option>
              {us_states.map((usState) => (
                <option key={usState} value={usState}>
                  {usState}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {state.errors.state && state.state === "" && (
              <p className="text-red-500 text-xs italic">
                {state.errors.state}
              </p>
            )}{" "}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadZip"
            >
              Zip
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              id="leadZip"
              type="text"
              name="zip"
              value={state.zip}
              onChange={updateFieldValue("zip")}
            />
            {state.errors.zip && state.zip === "" && (
              <p className="text-red-500 text-xs italic">{state.errors.zip}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="leadContactMethod"
            >
              Preferred Contact Method
            </label>
          </div>
          <div className="relative md:w-2/3">
            <select
              id="leadContactMethod"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 px-4 py-2"
              name="body"
              value={state.preferredContactMethod}
              onChange={updateFieldValue("preferredContactMethod")}
            >
              <option value="" disabled hidden>
                --Please choose an option--
              </option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="sms">Sms</option>
              <option value="carrier pigeon">Carrier Pigeon</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {state.errors.preferredContactMethod &&
              state.preferredContactMethod === "" && (
                <p className="text-red-500 text-xs italic">
                  {state.errors.preferredContactMethod}
                </p>
              )}{" "}
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <span>Submit</span>
            </button>
          </div>
        </div>{" "}
      </form>
    </div>
  );
};

export default Form;
