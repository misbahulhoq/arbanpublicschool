import "animate.css";

const WelcomeMessage = () => {
  return (
    <div
      className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('//blob-haikei.svg')`, // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-0 dark:bg-opacity-70"></div>{" "}
      {/* Dark overlay */}
      <div className="animate__animated animate__backInUp relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Welcome to{" "}
          <span className="text-accent dark:text-primary">
            Arban Public School!
          </span>
        </h1>
        <p className="mb-6 text-2xl">
          A place where learning is fun and every child is special.
        </p>
        <button className="btn btn-primary">Explore More</button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
