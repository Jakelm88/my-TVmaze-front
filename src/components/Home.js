import "../styles/Home.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useRef, useState } from "react";

function validateSearch(e) {
  // Fonction de validation de l'entrée formulaire de l'utilisateur.
  // TODO: vérifier que l'entrée soit du texte acceptable pour envoyer à l'api.
  if (e === "") return false;
  else return true;
}

function onSubmit(search, setData) {
  // Fonction lançant la recherche vers l'api https://api.tvmaze.com/search/shows?q={search}
  if (validateSearch(search)) {
    // grab data from api then store data in cache
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const data = [];
        for (const item of res) {
          data.push(item);
        }
        setData(data);
      });
  }
}

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  const submitBtn = useRef(null);
  return (
    <div className="Home-search">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? submitBtn.current.click() : null)}
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
  return (
    <div>
      <ImageList className="Home-list" cols={5}>
        {props.data.map((item) => (
          <ImageListItem key={item.show.id}>
            <img
              src={item.show.image?.medium}
              alt={item.show.name}
              loading="lazy"
            />
            <ImageListItemBar title={item.show.name} position="below" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

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

export default Home;
