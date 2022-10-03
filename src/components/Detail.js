import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

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
      <div>
        You asked for detail #{id}.
        <Link component={RouterLink} to="/">Return</Link>
      </div>
    );
  else return null;
}

export default Detail;
