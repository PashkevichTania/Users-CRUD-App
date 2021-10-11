import Header from "components/Header/Header";
import Cards from "components/Cards/Cards";
import {getAllUsers} from "services/apiRequests";
import {useQuery} from "react-query";
import {useContext} from "react";
import {GlobalDispatchContext} from "context/GlobalContext";



export default function Home() {



    const dispatchContext = useContext(GlobalDispatchContext);


    const { isLoading, error, data } = useQuery('getAllUsers', () =>
        getAllUsers()
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    if (data){
        dispatchContext(data.data)
    }


    return (
        <div>
            <Header />
            <Cards />
        </div>
    );
}
