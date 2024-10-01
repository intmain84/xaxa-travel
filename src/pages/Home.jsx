import Button from "../components/Button";

function Home() {
  return (
    <div className="h-shv flex flex-col items-center">
      <div>
        <h1 className="text-center">Put every piece of journeys on the map!</h1>
        <p className="mt-4 text-center text-lg">
        Discover new places with fellow travelers and share your own on the map. You need to login to add locations
        </p>
        
          <div className="flex w-full gap-3 mt-5">
            <Button width="flex-1" primary to="/login">Login</Button>
            <Button width="flex-1" secondary to="/signup">Sign Up</Button>
          </div>
      </div>
    </div>
  );
}

export default Home;
