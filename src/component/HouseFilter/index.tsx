import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import SelectConfig from "../../interface/select";
import { RootState } from "../../store";
import {
  setIn,
  setOut,
  setGuest,
  setName,
  setCity,
  setCol,
  setBy,
} from "../../store/slice/House/houseFilterSlice";
import Input from "../Input";
import Select from "../Select";

function HouseFilter() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const [filterName, setFilterName] = useState<string>('')
  const [filterCity, setFilterCity] = useState<string>('')
  const debouncedName = useDebounce(filterName, 1000)
  const debouncedCity = useDebounce(filterCity, 1000)

  const { dateIn, dateOut, guest, sortCol, sortBy } = useSelector(
    (state: RootState) => state.filterHouse
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(debouncedName) {
      dispatch(setName(debouncedName))
    }

    if(filterName === ''){
      dispatch(setName(filterName))
    }

    if(debouncedCity) {
      dispatch(setCity(debouncedCity))
    }

    if(filterCity === '') {
      dispatch(setCity(filterCity))
    }

  }, [debouncedName, debouncedCity, filterName, filterCity, dispatch])

  const guestConfig: SelectConfig[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  const sortColumnConfig: SelectConfig[] = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "City", value: "city" },
  ];

  const sortByConfig: SelectConfig[] = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value)
  };
  
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCity(e.target.value)
  }

  return (
    <div className="d-flex flex-column flex-md-row mb-4 gap-4">
      <Input
        label="Check In"
        type="date"
        id="indate"
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
        id="outdate"
        name="outdate"
        min={tommorow.toISOString().split("T")[0]}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setOut(e.target.value))
        }
        value={dateOut}
      />
      <Select
        name="guest"
        label="Guest"
        config={guestConfig}
        value={guest}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setGuest(e.target.value))
        }
      />
      <Input
        label="Name"
        type="text"
        id="name"
        name="name"
        handle={(e) => handleName(e)}
        value={filterName}
      />
      <Input
        label="City"
        type="text"
        id="city"
        name="city"
        handle={(e) => handleCity(e)}
        value={filterCity}
      />
      <Select
        name="sortcol"
        label="Sort"
        config={sortColumnConfig}
        value={sortCol}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setCol(e.target.value))
        }
      />
      <Select
        name="sortby"
        label="Sort By"
        config={sortByConfig}
        value={sortBy}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setBy(e.target.value))
        }
      />
    </div>
  );
}

export default HouseFilter;
