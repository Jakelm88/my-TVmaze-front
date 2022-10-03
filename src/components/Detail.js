import "../styles/Detail.css";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

function Detail() {
  let { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }, [id]);

  if (data)
    return (
      <div className="Detail-data">
        <h3>{data.name}</h3>
        <img
          className="Detail-image"
          src={data.image?.original}
          alt={data.name}
          loading="lazy"
        />
        <div className="Detail-summary">{data.summary}</div>
        <Button
          component={RouterLink}
          to="/"
          color="secondary"
          variant="contained"
          disableElevation
        >
          Return
        </Button>
      </div>
    );
  else
    return (
      <div className="Detail-loading">
        You asked for detail #{id}. Loading ...
      </div>
    );
}

export default Detail;
