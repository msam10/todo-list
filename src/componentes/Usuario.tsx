import { useParams } from "react-router";

const Usuario = () => {
  const { nombreUsuario } = useParams<{ nombreUsuario: string }>();
   
      const hobbies: string[] = [
        "ver anime",
        "Escuchar musica",
        "pintar",
        "Programar",
      ]
  return (
    <div className="w-screen h-screen text-black font-medium flex flex-col items-center justify-center gap-y-4 absolute inset-0">
      <h1 className="text-5xl ">Ruta parametrizada</h1>
      <p className="text-7xl inline-block">  El valor recibido en la URL es: {nombreUsuario} </p>
      <h1>Sus habilidades son:</h1>


   <div className="flex flex-wrap gap-3 justify-center mt-2">
         {hobbies.map((hobby, index) => (
    <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-lg font-semibold shadow-md transition-all duration-200 hover:bg-white/20 cursor-default`}>
      {hobby}
        </div>
        ))}
        </div>
        </div>  
  );
};

export default Usuario;