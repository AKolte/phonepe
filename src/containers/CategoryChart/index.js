import React, { useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import filterContext from "../../FilterContext";
import { fetchCategoryData } from "../../utils";
const CategoryChart = () => {
  const { filter } = useContext(filterContext);
  let categoryData = fetchCategoryData(filter);

  const data = categoryData.map((eachCategory) => {
    return {
      name: eachCategory.name,
      value: eachCategory.paymentInstruments[0].amount,
    };
  });

  const COLORS = ["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
      name,
      fill,
    } = props;
  
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <PieChart style={{ margin: 0 }} width={window.innerWidth} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

export default CategoryChart;
