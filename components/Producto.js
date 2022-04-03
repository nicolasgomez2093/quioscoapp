import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

function Producto({ producto }) {
  const {handleSetProducto, handleChangeModal} = useQuiosco()

  const { nombre, precio, imagen } = producto;

  return (
    <div className="border p-3">
      <div className="text-center">
        <Image
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen platillo ${nombre}`}
          width={450}
          height={500}
        />
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full uppercase font-bold p-3 mt-5"
          onClick={() => {
            handleChangeModal()
            handleSetProducto(producto)
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
export default Producto;
