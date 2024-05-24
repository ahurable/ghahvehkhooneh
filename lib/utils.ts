import { LOCALHOST } from "./variebles"


const refreshToken = async (refresh:string) => {
    // console.log(refresh)
    const res = await fetch(LOCALHOST + 'api/auth/refresh/', {
        method:'POST',
        body: JSON.stringify({refresh: refresh}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    if ('access' in data){
        localStorage.removeItem('access')
        localStorage.setItem('access', data.access)
    } else {
        location.replace('/logout')
    } 
}

export { refreshToken }