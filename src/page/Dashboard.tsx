import CustomChart from "@/component/chart/CustomChart";
import "./Dashboard.css";
import Card from "@/component/card/Card";
import Table from "@/component/table/Table";
import { useState } from "react";

const Dashboard = () => {
  const [isTableFullScreen, setIsTableFullScreen] = useState<boolean>(false);
  return (
    <>
      <div className="dashboard">
        <div className={`cards ${isTableFullScreen === true && "notVisible"}`}>
          <Card
            title="Total Revenue"
            content="$11,5237"
            description="From last month"
          />
          <Card
            title="Total Revenue"
            content="$11,5237"
            description="From last month"
          />
          <Card
            title="Total Revenue"
            content="$11,5237"
            description="From last month"
          />
          <Card
            title="Total Revenue"
            content="$11,5237"
            description="From last month"
          />
        </div>
        <div className={`contents ${isTableFullScreen === true && "isFullScreen"}`}>
          <CustomChart />
          <Table
            title="Sales orders"
            badgeColumn="status"
            boldColumn="orderId"
            isFullScreen={isTableFullScreen}
            onViewAll={() => setIsTableFullScreen(!isTableFullScreen)}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
