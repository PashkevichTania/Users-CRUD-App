import Home from "pages/home/home";
import {getCookie} from "cookieUtils/cookieUtils";
import {useQuery} from "react-query";
import {login} from "services/auth";
import {getAllUsersPaginated} from "services/apiRequests";
import {useEffect, useState} from "react";


function App() {

    const [isAuth, setAuth] = useState(false);

    useEffect(async ()=>{
        // console.group('cookie: ')
        // console.log(document.cookie)
        // console.log('cookie user: ', getCookie('X-AUTH-USER-CRUD'))
        // console.groupEnd()


        const res = await getAllUsersPaginated(1,1)
        setAuth(res.responseStatus.isAuth)
        console.log('res:s ',res)

    },[])



    return (
        <div className="App">
            {isAuth? <Home/>: null}
        </div>

    );
}

export default App;
