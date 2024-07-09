import DesktopUI from "./_components/DesktopUI";
import MobileUI from "./_components/MobileUI";
import TabletUI from "./_components/TabletUI";

const Dashboard = () => {
  return (
    <>
      <div className="hidden xl:block h-full">
        <DesktopUI />
      </div>

      <div className="h-full hidden md:block xl:hidden md:pb-4">
        <TabletUI />
      </div>

      <div className="h-full md:hidden">
        <MobileUI />
      </div>
    </>
  );
};

export default Dashboard;
