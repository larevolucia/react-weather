import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="loader">
      <TailSpin
        height="80"
        width="80"
        color="var(--hover-color)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loader;
