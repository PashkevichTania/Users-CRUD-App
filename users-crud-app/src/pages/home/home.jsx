import Header from "components/Header/Header";
import Cards from "components/Cards/Cards";
import {getAllUsersPaginated} from "services/apiRequests";
import {useQuery} from "react-query";
import {useGlobalDispatchContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";




export default function Home() {

    const dispatch = useGlobalDispatchContext();



    const { isLoading, error, data } = useQuery('getUsers', () =>
        getAllUsersPaginated(1)
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    if (data){
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: data.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: data.data.docs})
    }


    return (
        <div>
            <Header />
            <Cards />
        </div>
    );
}
