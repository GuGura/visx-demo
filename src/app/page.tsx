import BarType1 from "@/app/_components/implement/BarType1";
import ExampleBars from "@/app/_components/demo/ExampleBars";
import { addMonths, format } from "date-fns";

export default async function Home() {
  const data = await getDatesFrom2021to2024();
  console.log(data);
  // data[0] = { date: "2021년 01월", price: 30000 };
  return <BarType1 data={data?.slice(25)} />;
}

//<ExampleBars height={300} width={600} />;
//<BarType1 />;

async function getDatesFrom2021to2024() {
  const startDate = new Date(2021, 0, 1); // January is 0 in JS Date
  const endDate = new Date(2024, 0, 1);
  let dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const object: any = {};
    object["date"] = format(currentDate, "yyyy년 MM월");
    object["price"] = Math.ceil(Math.random() * 20000) - 5000;
    dates.push(object);
    currentDate = addMonths(currentDate, 1); // Add one month at a time
  }

  return dates;
}
