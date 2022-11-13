import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { allKitties } from "../redux/kitties/kitties-operations.js";
import { getisLoading } from "../redux/kitties/kitties-selectors.js";
import { getSortParams } from "../redux/kitties/kitties-selectors.js";

import SearchBar from "./SearchBar";
import KittiesGallery from "./KittiesGallery";
import Loader from "./Loader";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getisLoading);
  const params = useSelector(getSortParams);
  useEffect(() => {
    dispatch(allKitties(params));
  }, [dispatch, params]);

  return (
    <div>
      <SearchBar />
      <KittiesGallery />
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
