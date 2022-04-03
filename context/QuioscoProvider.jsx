import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState('')

  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);
  // Con este useeffect tomamos un valor inicial para la categoria
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

    setTotal(nuevoTotal)
  }, [pedido])


  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    // Como nos devuelve un array de objetos tenemos que aclarar que necesitamos el objeto 0
    setCategoriaActual(categoria[0]);
    router.push('/')
  };

  // Recibo el producto al cual le hice click y lo guardo en state con esta funcion
  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };
  // Con esta forma de destructuring saco del objeto a categoriaId 
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      // Actualizamos la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      )
      setPedido(pedidoActualizado)
      toast.success('Cambios guardados')
    } else {
      setPedido([...pedido, producto]);
      toast.success('Pedido Agregado')
    }
    setModal(false)
  };

  const handleEditarCantidades = id => {
    const productoActualizar = pedido.filter( producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter( producto => producto.id !== id)
    setPedido(pedidoActualizado)
    toast.error('Pedido Eliminado')
  }

  // Enviando pedido
  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

      // Reseteamos el pedido una vez que lo mandamos
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Pedido Realizado Correctamente')
      setTimeout(() => {
        router.push('/')
      }, 4000)


    } catch (error) {
      console.log(error)
    }
  };


  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        handleSetProducto,
        producto,
        handleChangeModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
