import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Saved from "./components/Saved";

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("nature");
  const [loader, setLoader] = useState(true);
  const [saved, setSaved] = useState([]);

  const API_KEY = "saei7LWKWw2BKrdCJGJr9t7OuBmlVzTK1SrVQMy9N7OxVMpAiL6YdTB5";
  //const URL = "https://api.pexels.com/v1/search?query=nature&per_page=1"

  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${search}&per_page=80`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      // console.log("response from api", res.data.photos)
      setImages(res.data.photos);
      setLoader(false);
    };

    const data = JSON.parse(localStorage.getItem("Images"))
    if(data){
      setSaved(data) // here data is coming from local storage.
    }

    fetchImage();
  }, [search]);
  // console.log(saved)

  useEffect(()=>{
    if(saved.length !=0){
      const json = JSON.stringify(saved);
      localStorage.setItem('Images',json)
    }
  },[saved])

  return (
    <>
      <Router>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                images={images}
                loader={loader}
                saved={saved}
                setSaved={setSaved}
              />
            }
          />
          <Route path="/saved" element={<Saved saved={saved} loader={loader} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
