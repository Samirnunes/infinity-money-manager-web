import React, { useEffect, useRef, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import {handlePlotGastosFixos, handlePlotGastosUnicos} from "../../../plotters/handles/PlotHandles";
import TransactionCard from "./TransactionCard";

const TransactionList = () => {
    const [gastosUnicosData, setGastosUnicosData] = useState([]);
    const [gastosFixosData, setGastosFixosData] = useState([]);

    function addFixedTransactions(fixedTransaction, uniqueTransactions) {
        const today = new Date();
        const referenceDate = new Date(fixedTransaction.data);
        const newDate = new Date(referenceDate); // Copiando a data do gasto

        while (newDate <= today) {
            // Append transaction to list
            const newTransaction = {
                "id": fixedTransaction.id,
                "valor": fixedTransaction.valor,
                "categoria": fixedTransaction.categoria,
                "descricao": fixedTransaction.descricao,
                // Converter a data para o formato "YYYY-MM-DD"
                "data": newDate.toISOString().slice(0, 10),
                "metas_id": fixedTransaction.metas_id
            };
            uniqueTransactions.push(newTransaction);

            // Get the periodicy
            switch (fixedTransaction.periodicidade) {
                case "Diária":
                    newDate.setDate(newDate.getDate() + 1);
                    break;
                case "Semanal":
                    newDate.setDate(newDate.getDate() + 7);
                    break;
                case "Mensal":
                    newDate.setMonth(newDate.getMonth() + 1);
                    break;
                case "Bimestral":
                    newDate.setMonth(newDate.getMonth() + 2);
                    break;
                case "Trimestral":
                    newDate.setMonth(newDate.getMonth() + 3);
                    break;
                case "Semestral":
                    newDate.setMonth(newDate.getMonth() + 6);
                    break;
                case "Anual":
                    newDate.setFullYear(newDate.getFullYear() + 1);
                    break;
                default:
                    return;
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handlePlotGastosUnicos(setGastosUnicosData);
                console.log('Gastos Unicos Data:', gastosUnicosData);
                await handlePlotGastosFixos(setGastosFixosData);
                console.log('Gastos Fixos Data:', gastosFixosData);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        gastosFixosData.forEach(function(gasto) {
            addFixedTransactions(gasto, gastosUnicosData);
        });
    }, [gastosFixosData, gastosUnicosData]);

    return (
        <div>
            {gastosUnicosData.map((gasto) => (
                <TransactionCard
                    key={gasto.id}
                    tipo={gasto.categoria || "Sem Categoria"}
                    descricao={gasto.descricao}
                    valor={gasto.valor}
                />
            ))}
        </div>
    );
};

export default TransactionList;