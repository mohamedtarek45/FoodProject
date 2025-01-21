import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Toaster } from "@/components/ui/sonner"
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hidePaths = ["/user-profile","/manage-restaurant","/search/:city","/details/:restaurantId","/order-status"];
  const isCitySearch = location.pathname.startsWith("/search/");
  const isDetailsPage = location.pathname.startsWith("/details/");
  const showHero = hidePaths.includes(location.pathname)||isCitySearch||isDetailsPage;
  return (
    <Auth0ProviderWithNavigate>
      <div className="flex flex-col min-h-screen">
        <Header />
        {!showHero && <Hero />}
        <div className="py-10 flex-1 container mx-auto">
          <Outlet />
          <Toaster theme={'light'} richColors visibleToasts={1} position={'top-right'}/>
        </div>
        <Footer />
      </div>
    </Auth0ProviderWithNavigate>
  );
};
export default Layout;
