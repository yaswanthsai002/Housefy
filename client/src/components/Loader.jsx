import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#179cf0"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default Loader;
