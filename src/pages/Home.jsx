import Button from "../components/Button";

function Home() {
  return (
    <div className="h-shv flex flex-col items-center">
      <div>
        <h1 className="text-center">Твои путешествия на карте!</h1>
        <p className="mt-4 text-center text-lg">
          Открывай новые места вместе с другими путешественниками и делись
          своими на карте
        </p>
        <p className="mt-4 text-center text-lg">
          Чтобы добавлять точки на карту необходимо авторизоваться
          <Button to="/login">Войти</Button>
        </p>
      </div>
    </div>
  );
}

export default Home;
