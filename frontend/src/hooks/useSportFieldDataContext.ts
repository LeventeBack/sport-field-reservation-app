import { useContext } from "react";
import { SportFieldDataContext } from "../contexts/SportFieldDataContext";

const useSportFieldDataContext = () => {
  return useContext(SportFieldDataContext);
};

export default useSportFieldDataContext;
