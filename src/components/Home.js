import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";

function validateSearch(e) {
  // Fonction de validation de l'entrée formulaire de l'utilisateur.
  // TODO: vérifier que l'entrée soit du texte acceptable pour envoyer à l'api.
  if (e == "") return false;
  else return true;
}

function onSubmit(search, setData) {
  // Fonction lançant la recherche vers l'api https://api.tvmaze.com/search/shows?q={search}
  if (validateSearch(search)) {
    console.log("Search button pressed", search);
    // grab data from api
    // store data in cache
    setData([{show:{name:"Hello. This is me, the submit function."}}])
  }
}

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
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
      <div>Data belongs here. (TODO: movies list with mini icon and title)</div>
      <h5>{props.data[0].show.name}</h5>
    </div>
  );
}

function Home() {
  const [list, setList] = useState([{ show: { name: "Nothing to see yet" } }]);
  return (
    <div>
      <h3>This is home.</h3>
      <SearchBar setData={setList} />
      <DataList data={list} />
    </div>
  );
}

export default Home;
