interface Product {
  child_item_id:string;
  id:string;
  item_name:string;
  name:string;
  price:string;
  product_id:string;
}

interface Products {
  [index: number]: Product;
}


export interface AllProducts {
  data: {
    "Jenis Kelamin": Products;
    Durasi: Products;
  };
  status: boolean;
}
