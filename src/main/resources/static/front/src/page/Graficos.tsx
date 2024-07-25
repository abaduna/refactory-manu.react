


import { useEffect, useState } from "react";
import { useFetch } from "../hock/useFetch";
import ChartsLine from "../componets/ChartsLine";
import LinesChart from "../componets/lineChart";
import { useNavigate } from "react-router-dom";


const Graficos = () => {
    const { getDataV2 } = useFetch();
    const [pedidos, setPedidos] = useState<number[]>([]);
    const [start, setStart] = useState<string>();
    const [end, setEnd] = useState<string>();
    const [cant, setCant] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
      const getData = async () => {
        ///
        const data = await getDataV2(
          `api/grafic/moth/?start=${start} 01:01:01&end=${end} 23:59:59`
        );
        setPedidos(data?.data);
        const cantRes = await getDataV2(
          `api/amount?start=${start} 01:01:01&end=${end} 23:59:59`
        );
        setCant(cantRes?.data);

      };
      if (!localStorage.getItem("token")) {
        navigate('/login');
      }
      getData();
    }, [start, end]);
    return (
      <div>
        <label>Empeiza</label>
        <input type="date" onChange={(e) => setStart(e.target.value)} />
        <label>Termina</label>
        <input type="date" onChange={(e) => setEnd(e.target.value)} />
        <LinesChart pedidos={pedidos} />
        <ChartsLine cantidad={cant}/>
      </div>
    );
}
export default Graficos