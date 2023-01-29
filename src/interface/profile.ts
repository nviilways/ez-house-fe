import ICity from "./city"
import IRole from "./role"
import IWallet from "./wallet"

interface IProfile {
    id: number,
    email: string,
    full_name: string, 
    address: string,
    city_id: number,
    city: ICity,
    role_id: number,
    role: IRole,
    wallet: IWallet
    
}

export default IProfile