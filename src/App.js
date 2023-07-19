import './App.css'
import RouterComponent from './router';
function App() {

  // const DateFormat = (date) => {
  //   var d = new Date(date),
  //     month = "" + (d.getMonth() + 1),
  //     day = "" + d.getDate(),
  //     time = "" + `${d.getHours().toString().replace(/^(\d)$/, '0$1')}:${d.getMinutes().toString().replace(/^(\d)$/, '0$1')}`,
  //     year = d.getFullYear();

  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;

  //   let Month = [year , month , day  ].join("-");
  //   return [Month , time].join("T")
  // };
  // console.log(DateFormat(new Date()));

  return (
    <>
    <RouterComponent/>

    </>
  );
}

export default App;
