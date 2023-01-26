import React, { useState } from "react";
import { useCookies } from "react-cookie";

function UpdateUser() {
    const [cookies] = useCookies(['token']);

    // TODO: Change City to Dropdown
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<number>(0);

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleAddress = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleCity = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.valueAsNumber);
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_URL}/update`, {
            method: "PATCH",
            headers: {
                "Authorization" : `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                full_name: name,
                address: address,
                city_id: city
            })
        }).then((res) => {
            if(!res.ok) {
                alert('failed to update profile');
                return;
            }

            alert('update successfull');
        })
    }

    return (
    <div>
      <div className="container">
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              onChange={(e) => handleName(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className="form-control"
              onChange={(e) => handleAddress(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="number"
              name="city"
              id="city"
              className="form-control"
              onChange={(e) => handleCity(e)}
            />
          </div>
          <button type="submit" className="form-control btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser