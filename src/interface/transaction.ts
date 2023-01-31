import ITxType from "./txtype"

interface ITransaction {
    id: number
    wallet_id: number
    transaction_type: ITxType
    balance: number
    created_at: Date
}

export default ITransaction