import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import AddNews from "../pages/news/addnews";
import News from "../pages/news";
import ManageNews from "../pages/news/newsList";

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<AddNews />} />
      <Route path="/add-news" element={<AddNews />} />
      <Route path="/notifications" element={<News />} />
      <Route path="/manage-news" element={<ManageNews />} />
    </Routes>
  );
}

export default RoutesList;
