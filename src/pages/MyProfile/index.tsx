import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import IResponseProfile from "../../interface/response"

function MyProfile() {
   const [cookies] = useCookies(['token']);
   const [data, setData] = useState<IResponseProfile>();

   useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/me`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${cookies.token}`,
        }
    }).then((res) => {
        if(!res.ok){
            alert("failed to fetch user");
            return;
        }

        return res.json();
    }).then((data: IResponseProfile) => {
        setData(data);
    })
   }, [cookies])


    return(
        <div>
            <div className="Profile">
                <div>
                <p>ID: {data?.data.id}</p>
                <p>Email: {data?.data.email}</p>
                <p>Full Name: {data?.data.full_name}</p>
                <p>Address: {data?.data.address}</p>
                <p>City Id: {data?.data.city_id}</p>
                <p>City Name: {data?.data.city.name}</p>
                <p>Role Id: {data?.data.role_id}</p>
                <p>Role Name: {data?.data.role.name}</p>
                <p>Wallet Id: {data?.data.wallet.id}</p>
                <p>Wallet User Id: {data?.data.wallet.user_id}</p>
                <p>Wallet Balance: {data?.data.wallet.balance}</p>
                </div>
            </div>
        </div>
    )
}

export default MyProfile