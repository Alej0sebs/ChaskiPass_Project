import React, { useDeferredValue, useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import { FaBusAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { FaPeopleGroup } from "react-icons/fa6";
import useDashboard from '../../hooks/useDashboard';
import { useAuthContext } from '../../context/AuthContext';

const ECommerce: React.FC = () => {

  const {loading, cardsDataDashboard} = useDashboard();
  const [activeFreq,setActiveFreq] = useState<number>(0);
  const [quantityPayments,setQuantityPayments] = useState<number>(0);
  const [sales,setSales] = useState<number>(0);
  const [quantityClients,setQuantityClients] = useState<number>(0);
  const {authUser} = useAuthContext();


  useEffect(() => {
    // Si authUser es null o undefined, salimos y NO llamamos a fetchData.
    console.log(authUser);
    if (!authUser) return;
    
    const fetchData = async () => {
      try {
        const data = await cardsDataDashboard();
        if (data) {
          const { dataActiveFreq, dataQuantityPayments, dataSales, dataQuantityClients } = data;
          setActiveFreq(dataActiveFreq);
          setQuantityPayments(dataQuantityPayments);
          setSales(dataSales);
          setQuantityClients(dataQuantityClients);
        }
      } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
      }
    };
  
    setTimeout(() => {
      fetchData();
    }, 10000);
  }, [authUser]);
  

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Frecuencias Activas" total={activeFreq.toString()} rate="0.43%" levelUp>
          <FaBusAlt className='w-[22px] h-[22px]' />
        </CardDataStats>
        <CardDataStats title="Tickets Vendidos" total={quantityPayments.toString()} rate="4.35%" levelUp>
          <MdOutlinePayments className='w-[22px] h-[22px]' />
        </CardDataStats>
        <CardDataStats title="Total Ventas" total={`$${sales.toString()}`}  rate="2.59%" levelUp>
          <FcSalesPerformance  className='w-[22px] h-[22px]'/>
        </CardDataStats>
        <CardDataStats title="Total Clientes" total={quantityClients.toString()}  rate="0.95%" levelDown>
          <FaPeopleGroup className='w-[22px] h-[22px]' />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
