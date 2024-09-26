import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center h-shv">
      <div>
        <h1 className="text-center">Твои путешествия на карте!</h1>
        <p className="text-center mt-4 text-lg">
          Открывай новые места вместе с другими путешественниками и делись
          своими на карте
        </p>
        <p className="text-center mt-4 text-lg">
          Чтобы добавлять точки на карту необходимо{" "}
          {
            <Link className="font-bold" to="/login">
              авторизоваться
            </Link>
          }
        </p>
      </div>
    </div>
  );
}

export default Home;
