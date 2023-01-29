interface Pagination<T> {
    page: number
    limit: number
    count: number
    data: T | null
}

export default Pagination