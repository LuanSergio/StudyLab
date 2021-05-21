import "./styles.css";
import { useFilter } from "../../context";

interface IData {
  name: string;
  color: string;
  date: string;
}

function Table() {
  const { list } = useFilter();

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Creation Date</th>
        </tr>

        {list.map((item: IData, index: number) => (
          <tr key={`${item.name} + ${index}`}>
            <td>{item.name}</td>
            <td>{item.color}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
