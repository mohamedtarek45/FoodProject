import landingImage from "../assets/landing.png"
import appDownlaoding from "../assets/appDownload.png"
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const nav=useNavigate();
  const HandleSubmit=(formData:searchForm)=>{
    console.log(formData.searchQuery);
    nav({
      pathname:`search/${formData.searchQuery}`,
    })
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-16 bg-white shadow-md py-8 flex flex-col gap-5 text-center rounded-lg -mt-16 ">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar placeHolder="Search by cities like Cairo and Manchester" onSubmit={HandleSubmit} searchQuery=""/>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage}  />
        <div className="flex flex-col items-center justify-center gap-4 text-center ">
            <span className="font-bold text-3xl tracking-tight">
                Oreder takeway even faster
            </span>
            <span className="">
                Download the App for faster oredering and personalised and recommendations
            </span>
            <img src={appDownlaoding}  />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
