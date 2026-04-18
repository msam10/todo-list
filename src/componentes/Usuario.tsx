import { useParams } from "react-router";
import { useState } from "react";

const Usuario = () => {
  const { nombreUsuario } = useParams<{ nombreUsuario: string }>();
   
  const Hobby: string[] = 
  [
    "Programar", 
    "Ver anime", 
    "Pintar",
    "Escuchar musica"
  ];
  const [hobbiesSeleccionados, setHobbiesSeleccionados] = useState<string[]>([]);

  const manejarClickHobby = (hobby: string) => {
    const estaSeleccionado = hobbiesSeleccionados.includes(hobby);
    if (estaSeleccionado) {
      setHobbiesSeleccionados(prev => prev.filter(h => h !== hobby));
    } else {
      setHobbiesSeleccionados(prev => [...prev, hobby]);
    }
  };

  const cantidadSeleccionados = hobbiesSeleccionados.length;
  const todosSeleccionados = cantidadSeleccionados === Hobby.length;

  return (
    <div className="w-screen h-screen font-medium flex flex-col items-center justify-center gap-y-4 absolute inset-0 bg-slate-950 pb-10">
      <h1 className="text-5xl text-slate-100">Ruta parametrizada</h1>
      <p className="text-7xl inline-block text-slate-300">
        El valor recibido en la URL es: {nombreUsuario}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {Hobby.map((hobby, index) => {
          const estaSeleccionado = hobbiesSeleccionados.includes(hobby);
          return (
            <div
              key={index}
              className={`
                backdrop-blur-sm rounded-full px-5 py-2 text-lg font-semibold shadow-md
                transition-all duration-200 cursor-pointer
                ${
                  estaSeleccionado
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" 
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"  
                }
              `}
              onClick={() => manejarClickHobby(hobby)}
            >
              {hobby}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6 space-y-2">
        <p className="text-2xl text-slate-400">
          Cantidad de hobbies seleccionados: {cantidadSeleccionados}
        </p>
        {todosSeleccionados && (
          <p className="text-2xl font-bold text-cyan-300 animate-bounce">
            Todos los hobbies fueron seleccionados
          </p>
        )}
      </div>
    </div>
  );
};

export default Usuario;