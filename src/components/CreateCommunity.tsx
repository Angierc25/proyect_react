import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}
const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
  return data;
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/comunidades");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description });
  };
   return (
    
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20">
          <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Crear nueva comunidad
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium text-gray-200">
                Nombre de la Comunidad
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700/60 border-0 rounded-lg py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                required
                placeholder="Nombre de tu comunidad"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-lg font-medium text-gray-200">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700/60 border-0 rounded-lg py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                rows={4}
                placeholder="Describe el propósito de tu comunidad..."
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-70"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative flex items-center justify-center">
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                    </>
                  ) : (
                    "Crear Comunidad"
                  )}
                </span>
              </button>
            </div>
            
            {isError && (
              <div className="mt-4 bg-red-900/40 text-red-200 p-4 rounded-lg border border-red-500/50">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Error al crear la comunidad
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    
  );
};