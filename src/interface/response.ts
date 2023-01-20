import IProfile from "./profile";

interface IResponseProfile {
    code: number,
    message: string,
    data: IProfile,
}

export default IResponseProfile;