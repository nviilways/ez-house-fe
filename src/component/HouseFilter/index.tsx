import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectConfig from "../../interface/select";
import { RootState } from "../../store";
import {
  setIn,
  setOut,
  setGuest,
  setName,
  setCity,
  setCol,
  setBy
} from "../../store/slice/House/houseFilterSlice";
import Input from "../Input";
import Select from "../Select";

function HouseFilter() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const { dateIn, dateOut, guest, name, city, sortCol, sortBy } = useSelector(
    (state: RootState) => state.filterHouse
  );
  const dispatch = useDispatch();

  const guestConfig: SelectConfig[] = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'}
  ]

  const sortColumnConfig: SelectConfig[] = [
    {label: 'Name', value: 'name'},
    {label: 'Price', value: 'price'},
    {label: 'City', value: 'city'}
  ]

  const sortByConfig: SelectConfig[] = [
    {label: 'Ascending', value: 'asc'},
    {label: 'Descending', value: 'desc'}
  ]

  return (
    <div className="d-flex mb-5 gap-4">
      <Input
        label="Check In"
        type="date"
        name="indate"
        min={today.toISOString().split("T")[0]}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setIn(e.target.value))
        }
        value={dateIn}
      />
      <Input
        label="Check Out"
        type="date"
        name="outdate"
        min={tommorow.toISOString().split("T")[0]}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setOut(e.target.value))
        }
        value={dateOut}
      />
      <Select name="guest" label="Guest" config={guestConfig} value={guest} handle={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(setGuest(e.target.value))} />
      <Input label="Name" type="text" name="name" handle={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))} value={name} />
      <Input label="City" type="text" name="city" handle={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(setCity(e.target.value))} value={city} />
      <Select name="sortcol" label="Sort" config={sortColumnConfig} value={sortCol} handle={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(setCol(e.target.value))} />
      <Select name="sortby" label="Sort By" config={sortByConfig} value={sortBy} handle={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(setBy(e.target.value))} />
    </div>
  );
}

export default HouseFilter;
