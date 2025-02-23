import errorImg from "./../../assets/images/404 error with people holding the numbers.gif";

const Error = () => {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 mx-auto px-4 flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <img src={errorImg} alt="Error" className="w-full h-auto max-h-screen object-contain" />
    </div>
  );
};

export default Error;
