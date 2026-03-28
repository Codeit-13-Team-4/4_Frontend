import { useQuery } from "@tanstack/react-query";
import {
  getSideProjectList,
  getSideProjectSearchList,
} from "../api/getSideProjectList";

export const useGetProjectList = () => {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: () => {
      return getSideProjectList();
    },
  });
};

// export const useGetSearchProjectList = () => {
//   return useQuery({
//     queryKey: ["searchProject", keyword],
//     queryFn: () => getSideProjectSearchList(),
//   });
// };
