import { Card, CardContent } from "@mui/material";
import React, { useContext } from "react";
import filterContext from "../../FilterContext";
import { fetchData } from "../../utils";

const TransactionValueCard = () => {
  const { filter } = useContext(filterContext);
  let transactionStats = fetchData(filter);
    transactionStats = transactionStats[0] || transactionStats;
  return (
    <div className="transactionCard">
      <Card style={{ maxWidth: "400px" }} >
        <CardContent>
          <div>
            Transaction Amount: ₹
            {(transactionStats.metric[0].amount.toFixed() / 10000000).toFixed()}{" "}
            Crores
          </div>
          <div>
            Transaction Count: {transactionStats.metric[0].count.toFixed()}
          </div>
          <div>
            Average Transaction Value: ₹
            {(
              transactionStats.metric[0].amount /
              transactionStats.metric[0].count
            ).toFixed()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionValueCard;
