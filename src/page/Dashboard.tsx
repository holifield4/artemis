import "./Dashboard.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
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
    </>
  );
};

export default Dashboard;
