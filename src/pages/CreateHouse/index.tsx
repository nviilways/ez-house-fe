import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CreateHouse() {
    const [cookies] = useCookies(['token'])

  // Todo: City id change to dropdown fetch from city list
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [guest, setGuest] = useState<string>('');
  const [images, setImages] = useState<FileList | null>();
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files){
        return
    }
    setImages(e.target.files);
  };

  const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handlePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }

  const handleDesc = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  }

  const handleCity = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const handleGuest = (e:React.ChangeEvent<HTMLInputElement>) => {
    setGuest(e.target.value);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadStatus("Uploading...");
    
    const newForm = new FormData();
    
    for(let i = 0; i < images!.length; i++) {
        newForm.append("photo", images![i]);
    }

    newForm.append("name", name);
    newForm.append("price", price);
    newForm.append("description", desc);
    newForm.append("city_id", city);
    newForm.append("max_guest", guest);

    await fetch(`${process.env.REACT_APP_URL}/houses`, {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${cookies.token}`
        },
        body: newForm
    }).then((res) => {
        if(res.ok) {
            setUploadStatus('Upload Successfull');
        }
    }).catch((err) => {
        setUploadStatus(`Upload failed due to ${err}`);
    })

  };

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={(e) => handleName(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" onChange={(e) => handlePrice(e)}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={(e) => handleDesc(e)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">City Id</label>
          <input type="text" name="city-id" className="form-control" onChange={(e) => handleCity(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Guest</label>
          <input type="text" name="max-guest" className="form-control" onChange={(e) => handleGuest(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            name="photos"
            className="form-control"
            onChange={(e) => handleFile(e)}
          />
        </div>
        <button type="submit" className="form-control btn btn-primary">
          Submit
        </button>
      </form>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default CreateHouse;
