import React, { useState } from "react";
import { useCookies } from "react-cookie";

function TopUp() {
  const [amount, setAmount] = useState<number>();
  
  const [cookies] = useCookies(['token']); 

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_URL}/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization" : `Bearer ${cookies.token}`
      },
      body: JSON.stringify({
        amount: amount,
      }),
    }).then((res) => {
      if (!res.ok) {
        alert("Top Up Failed");
        return
      }
      alert("Top Up Success");
      return res.json();
    });
  };

  return (
    <div>
      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="form-control"
            placeholder="amount"
            onChange={(e) => handleAmount(e)}
          />
        </div>
        <button type="submit" className="form-control btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TopUp;
