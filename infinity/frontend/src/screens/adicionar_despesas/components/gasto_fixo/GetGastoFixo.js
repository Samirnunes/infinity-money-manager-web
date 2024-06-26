import React from "react";
import {handleGetAllGastosFixos} from "../../handles/GastoFixoHandles";

export function GetGastoFixo({setResponse}){
    return (
        <>
            <button
                className="button"
                onClick={() =>
                    handleGetAllGastosFixos(
                        setResponse
                    )
                }>
                Listar gastos fixos
            </button>
        </>
    )
}