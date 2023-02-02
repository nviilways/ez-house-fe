import { useEffect } from "react";
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { RootState } from "../../store";

function ProtectedPage() {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();
    const userStore = useSelector((state: RootState) => state.userStore)

    useEffect(() => {
        if(cookies.token == null) {
            if(userStore.id === 0){
                navigate('/login');
                return
            }
        }
    }, [cookies.token, navigate, userStore.id])


    return <Outlet />
}

export default ProtectedPage