import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Button from "../button/Button";

const chartData = [
  { month: "January", data: 186 },
  { month: "February", data: 305 },
  { month: "March", data: 237 },
  { month: "April", data: 73 },
  { month: "May", data: 209 },
  { month: "June", data: 214 },
  { month: "July", data: 43 },
  { month: "August", data: 291 },
  { month: "September", data: 40 },
];

const CustomChart = () => {
  const chartConfig = {
    chart: {
      label: "Data",
      color: "hsl(var(--custom-chart))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full">
      <CardHeader />
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-[280px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(129 92.5% 47.3%)" stopOpacity={1} />
                <stop offset="90%" stopColor="hsl(219 99% 62%)" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientBackground" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(120 90.9% 95.7%)" stopOpacity={1} />
                <stop offset="90%" stopColor="hsl(220 100% 75.9%)" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="data"
              type="natural"
              stroke="url(#gradientStroke)"
              fill="url(#gradientBackground)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-evenly">
        <Button label="Today" />
        <Button label="Yesterday" />
        <Button label="7 days" />
        <Button label="30 days" />
        <Button label="60 days" />
        <Button label="1 year" />
      </CardFooter>
    </Card>
  );
};

export default CustomChart;
