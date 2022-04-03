import Layout from "../layout/Layout";
import {useEffect, useCallback} from "react";
import useQuiosco from "../hooks/useQuiosco";
import {formatearDinero} from '../helpers'

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

//   Con usecallback se ejecuta solo cuando la dependencia cambia, Cuando el pedido o el nombre esta vacio me devuelve true y se desactiva el boton
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre.length < 3
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);



  return (
    <Layout pagina="Total y confirmar pedido">
      <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre
          </label>
          <input
            id="nombre"
            value={nombre}
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <p className="text-3xl">
            Total a pagar: {""} <span className="font-bold text-amber-500">{formatearDinero(total)}</span>
          </p>
        </div>
        <div className="mt-5">
          <input
            type="submit"
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
            className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer' }  text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
          />
        </div>
      </form>
    </Layout>
  );
}
