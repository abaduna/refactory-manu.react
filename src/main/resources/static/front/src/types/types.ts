export interface Menu {
    name: string;
    price: number;
    link_img: string;
    id?: string;
    category: string;
    setCarrito?: ()=>void;
    removeProduct?: ()=>void
  }
  export interface bodyProps {
    title: string;
    price: string;
    imageUpLoading: File | string;
    updata?: boolean;
    setUpdate?: any;
    stock: string;
    fetchFoodsData?: () => Promise<void>;
  }
  export interface foodsPedidos {
    name: string;
    product: string;
    price: number;
  }
  
  export interface ordenes {
    id: number;
    id_orden: number;
    tableNumber: string;
    dateTime: string;
    estados: string;
    phone:number
    address:string
  }
  export interface pedidos {
    id: number;
    id_orden: number;
    tableNumber: string;
    dateTime: string;
    estados: string;
  }
export interface Productos {
  id:number
  id_orden:number
  name:string
  price:string
}