import {handleChange} from "../../../ScreenUtils";
import {handleInsertCategoria, updateCategoriaList} from "../../handles/CategoriasHandles";
import React, {useState} from "react";

export function InputInsertCategoria({setResponse, setUpdateCategorias}){
    const [insertCategoriaData, setInsertCategoriaData] = useState({
        categoria: 'Outros',
    });

    return (
        <>
            <label>
                <span>Nova categoria:</span>
                <input type="text"
                       value={insertCategoriaData.categoria}
                       onChange={(e) =>
                           handleChange(
                               'categoria',
                               e.target.value,
                               insertCategoriaData,
                               setInsertCategoriaData
                           )
                }
                />
            </label>
            <br/>
            <button
                className="button"
                onClick={() =>
                    handleInsertCategoria(
                        insertCategoriaData,
                        setResponse
                    ).then(() =>
                        updateCategoriaList(setUpdateCategorias))
            }>
                Adicionar nova categoria
            </button>
        </>
    )
}