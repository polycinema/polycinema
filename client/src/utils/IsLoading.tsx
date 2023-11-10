import Lottie from "lottie-react";
import Loading from "../../public/IsLoading-Lottie.json";
const IsLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={Loading} className="w-32" />
    </div>
  );
};

export default IsLoading;
