import {useQuery} from "react-query";
import {getImages} from "services/imagesAPI";
import {getAllUsersPaginated} from "services/apiRequests";

export const useQueryMultiple = () => {
  const res1 = useQuery('getImages', () =>
      getImages());
  const res2 = useQuery('getUsers', () =>
      getAllUsersPaginated(1));
  return [res1, res2];
}