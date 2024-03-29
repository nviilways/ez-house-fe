import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TrashIcon from "../../assets/icon/Trash";
import HouseProps from "../../interface/props/house";
import { useDeleteHouseMutation } from "../../store/slice/House/houseApiSlice";

function DeleteHouse(props: HouseProps) {
  const [cookies] = useCookies(["token"]);
  const [deleteHouse, { isSuccess }] = useDeleteHouseMutation();
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("Are you sure want to delete this house ?")) {
      await deleteHouse({ token: cookies.token, id: props.house.id })
      .unwrap()
      .catch((error) => {
        toast.error(error.data.message)
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("House successfully deleted");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <label>Delete House</label>
      <button className="btn" onClick={handleDelete}>
        <TrashIcon class="mini" />
      </button>
    </div>
  );
}

export default DeleteHouse;
