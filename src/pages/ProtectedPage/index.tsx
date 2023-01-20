import { useEffect } from "react";
import { useCookies } from "react-cookie"
import { Outlet, useNavigate } from "react-router-dom"

function ProtectedPage() {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.token == null) {
            navigate('login');
            return
        }
    }, [cookies.token, navigate])


    return <Outlet />
}

export default ProtectedPage