"use client";
export default function Order(){
    return <div>
        <div className="bg-red-300 w-[400px] h-auto p-5">
            <div className="w-full flex justify-between">
                <span className="font-bold text-3xl">#3</span>
                <div>
                    <button className="mx-1">
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/84/84380.png" alt=""
                        className="w-[30px]"/>
                    </button>
                    <button className="mx-1">
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png"
                        alt="" className="w-[30px]"/>
                    </button>
                </div>

            </div>
            <div className="w-full justify-center flex">
                <span className="text-2xl">Mesa 1 (Pendente)</span>
            </div>
            <div className="my-4">
                <h2 className="font-bold text-xl">Entradas</h2>
                <ul className="list-disc ml-6">
                    <li>1 Coxinha</li>
                    <li>2 Saladas</li>
                </ul>
            </div>
            <div className="my-4">
                <h2 className="font-bold text-xl">Principal</h2>
                <ul className="list-disc ml-6">
                    <li>1 Salmão Grelhado</li>
                    <li>2 Strogonoff de Carne</li>
                </ul>
            </div>
            <div className="my-4">
                <h2 className="font-bold text-xl">Sobremesa</h2>
                <ul className="list-disc ml-6">
                    <li>1 Pudim</li>
                </ul>
            </div>
            <div className="my-4">
                <h2 className="font-bold text-xl">Bebida</h2>
                <ul className="list-disc ml-6">
                    <li>1 Coca-Cola 300ml</li>
                    <li>1 Suco de Laranja</li>
                </ul>
            </div>
        </div>
    </div>
}