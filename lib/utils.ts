import { jwtDecode } from "jwt-decode"
import { LOCALHOST } from "./variebles"
import { useAppDispatch } from "./hook"
import { setAvatar, setIsAdmin, setUsername } from "./features/userSlice"



// const Login = ({access, refresh}:{access:string, refresh:string}) => {
//     const dispatch = useAppDispatch()
//     const _user: {
//         username: string,
//         avatar: string,
//         is_admin: boolean,
//     } = jwtDecode(access)
//     console.log(_user.username)
//     dispatch(setUsername(_user.username))
//     dispatch(setAvatar(_user.avatar))
//     dispatch(setIsAdmin(_user.is_admin))
//     localStorage.setItem('access', access)
//     localStorage.setItem('refresh', refresh)
//     return null
// }


// const refreshToken = async (refresh:string) => {
//     // console.log(refresh)
//     const res = await fetch(LOCALHOST + 'api/auth/refresh/', {
//         method:'POST',
//         body: JSON.stringify({refresh: refresh}),
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//     const data = await res.json()
//     if ('access' in data){
//         // Login({access:data.access, refresh:data.refresh})
//     } else {
//         location.replace('/logout')
//     } 
// }


// export { refreshToken }