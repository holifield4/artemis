import CustomChart from "@/component/chart/CustomChart";
import "./Dashboard.css";
import Card, { CardData } from "@/component/card/Card";
import Table from "@/component/table/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getProductsAsync } from "@/state/products/productSlice";

const Dashboard = () => {
  const [isTableFullScreen, setIsTableFullScreen] = useState<boolean>(false);
  const tableData = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductsAsync()).catch((err) => console.error(err))
  },[dispatch])

  return (
    <>
      <div className="dashboard">
        <div className={`cards ${isTableFullScreen === true && "notVisible"}`}>
          <Card
            data={mockData}
          />
        </div>
        <div
          className={`contents ${isTableFullScreen === true && "isFullScreen"}`}
        > 
          <CustomChart />
          <Table
            data={tableData}
            title="Sales orders"
            badgeColumn="category"
            boldColumn="id"
            isFullScreen={isTableFullScreen}
            onViewAll={() => setIsTableFullScreen(!isTableFullScreen)}
          />
        </div>
      </div>
    </>
  );
};

const mockData: CardData[] = [
  {
    title: "Total Revenue",
    content: "$11,5237",
    description: "From last month",
  },
  {
    title: "Total new user",
    content: "+20",
    description: "From last month",
  },
  {
    title: "Total new merchant",
    content: "+3",
    description: "From last month",
  },
  {
    title: "Total active user",
    content: "+250",
    description: "From last month",
  },
];

export default Dashboard;
