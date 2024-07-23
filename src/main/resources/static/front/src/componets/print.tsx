
import { Productos } from './../types/types';
import { ordenes } from "./../types/types";
import { ComponentToPrint } from './ComponentToPrint';

const Print = ({productos,ordenes,componentRef}:{productos:Productos[],ordenes:ordenes,componentRef:any}) => {
  //const componentRef = useRef<HTMLDivElement | null>(null);
///  const handlePrint = useReactToPrint({content: () => componentRef.current});


  return (
    <div>
      <ComponentToPrint ref={componentRef} productos={productos} ordenes={ordenes}/>

    </div>
  );
};

export default Print