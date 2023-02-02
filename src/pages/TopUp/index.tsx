import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useUserTopupMutation } from "../../store/slice/User/userApiSlice";
import "./topup.scss";

function TopUp() {
  const [amount, setAmount] = useState<number>();

  const [cookies] = useCookies(["token"]);
  const [topup, { isError, isSuccess }] = useUserTopupMutation();

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount) {
      await topup({ amount: amount, token: cookies.token });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed Topup");
    }

    if (isSuccess) {
      toast.success("Topup Successful");
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="container d-flex flex-column justify-content-start align-items-center">
          <div className="topup-instruction">
            <h4>Top Up Instruction</h4>
            <p>
              1. Enter the amount you wish to top up, ensuring it falls between
              Rp 50.000 and Rp 10.000.000.
            </p>
            <p>2. Click Top-up. </p>
            <p>3. Wait for the top-up to be processed and confirmed. </p>
            <p>4. Check your balance to ensure the top-up was successful.</p>
          </div>
          <div className="topup-box mt-3">
            <Input
              label="Top up amount"
              type="number"
              name="topup"
              id="topup"
              min="50000"
              max="10000000"
              handle={handleAmount}
            />
            <Button label="Top-up" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TopUp;
