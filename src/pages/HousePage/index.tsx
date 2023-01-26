import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import IHouse from "../../interface/house";
import StandardResponse from "../../interface/response";

function HousePage() {
  const param = useParams();
  const [cookies] = useCookies(['token']);

  const [data, setData] = useState<StandardResponse<IHouse>>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/houses/${param.id}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          alert("failed to fetch house");
          return;
        }

        return res.json();
      })
      .then((data: StandardResponse<IHouse>) => {
        setData(data);
      });
  }, [param.id]);

  const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_URL}/houses/${param.id}`, {
        method: "DELETE",
        headers: {
          "Authorization" : `Bearer ${cookies.token}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            alert(res.statusText);
            return;
          }
  
          alert("Delete Successfull");
        });
  }

  return (
    <div className="container d-flex flex-column gap-3">
        <div>
            <p>Name: {data?.data?.name}</p>
            <p>Description: {data?.data?.description}</p>
            <p>City: {data?.data?.city.name}</p>
            <p>Price: {data?.data?.price}</p>
            <p>Max Guest: {data?.data?.max_guest}</p>
        </div>
        <div>
            <p>Photos</p>
            {data?.data?.house_photos.map((photo) => (
                <img key={photo.id} src={photo.photo_url} alt={data.data?.name} className="img-thumbnail w-25 h-25"/>
            ))}
        </div>
        <div>
            <button className="btn btn-danger" onClick={(e) => handleDelete(e)}>Delete House</button>
        </div>
    </div>
    );
}

export default HousePage;
