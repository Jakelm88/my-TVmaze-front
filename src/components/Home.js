import "../styles/Home.css";
import { Button, Input, Link } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link as RouterLink } from "react-router-dom";
import { useRef, useState } from "react";

function Home() {
  const [list, setList] = useState([]);
  return (
    <div>
      <h3>This is home.</h3>
      <SearchBar setData={setList} />
      <DataList data={list} />
    </div>
  );
}

function SearchBar(props) {
  const onSubmit = (search, setData) => {
    // Fonction lançant la recherche vers l'api https://api.tvmaze.com/search/shows?q={search}
    if (validateSearch(search)) {
      // grab data from api then store data in cache
      fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then(
          (res) => {
            return res.json();
          },
          (e) => {
            return Promise.reject(e);
          }
        )
        .then((res) => {
          const data = [];
          for (const item of res) {
            data.push(item);
          }
          setData(data);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    }
  };

  const validateSearch = (input) => {
    // Fonction de validation de l'entrée formulaire de l'utilisateur.
    /*
      TODO: vérifier que l'entrée soit du texte acceptable pour envoyer à l'api.
    */
    if (input === "") return false;
    else return true;
  };

  const [inputValue, setInputValue] = useState("");
  const submitBtn = useRef(null);
  //TODO: disable button while fetching data
  return (
    <div className="Home-search">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => {
          /*
            TODO: possible input validation on the fly
          */
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) =>
          e.key === "Enter" ? submitBtn.current.click() : null
        }
      />
      <Button
        ref={submitBtn}
        color="secondary"
        variant="contained"
        disableElevation
        onClick={() => onSubmit(inputValue, props.setData)}
      >
        Search
      </Button>
    </div>
  );
}

function DataList(props) {
  if (!props.data || !Array.isArray(props.data)) {
    console.error("Invalid data prop to DataList");
    return null;
  }
  return (
    <div>
      <ImageList className="Home-list" cols={5}>
        {props.data.map((item) => (
          <ImageListItem key={item.show.id}>
            <Link component={RouterLink} to={`/detail/${item.show.id}`}>
              <img
                src={item.show.image?.medium}
                alt={item.show.name}
                loading="lazy"
              />
              <ImageListItemBar title={item.show.name} position="below" />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Home;
