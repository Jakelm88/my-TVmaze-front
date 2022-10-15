import "../styles/Detail.css";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Button, Grid } from "@mui/material";

function Detail() {
  let { id } = useParams();
  /*
    TODO : validation param id
  */
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(
        (res) => {
          return res.json();
        },
        (e) => {
          return Promise.reject(e);
        }
      )
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }, [id]);

  if (data)
    return (
      <div className="Detail-data">
        <h3>{data.name}</h3>
        <Grid container>
          <Grid xs="auto">
            <img
              className="Detail-image"
              src={data.image?.original}
              alt={data.name}
              loading="lazy"
            />
          </Grid>
          <Grid xs>
            <div className="Detail-summary">{data.summary}</div>
          </Grid>
        </Grid>
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
