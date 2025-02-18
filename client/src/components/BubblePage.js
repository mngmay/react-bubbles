import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  console.log("bubble page", colorList);

  useEffect(() => {
    getColors();
  }, []);

  const getColors = () => {
    setLoading(true);
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        setColorList(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response);
      });
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      {loading && <div>Loading...</div>}
    </>
  );
};

export default BubblePage;
