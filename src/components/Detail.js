import { useParams } from "react-router-dom";

function Detail(){
    let { id } = useParams();
    return (
        <div>You asked for detail #{id}</div>
    );
}

export default Detail;
