import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import ChaskiLogoB from '../../images/chaski-logo/chaskilogoblack.svg';

Modal.setAppElement('#root');

interface TicketData {
  dia: string;
  horaSalida: string;
  horaLlegada: string;
  placa: string;
  terminal: string;
  destino: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  price: number;
  seats: string[];
}

interface PdfModalProps {
  data: TicketData;
}

const PdfModal: React.FC<PdfModalProps> = ({ data }) => {
    const [showPDF, setShowPDF] = useState(false);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  
    useEffect(() => {
      if (data) {
        generatePDF(data);
      }
    }, [data]);
  
    const generatePDF = async (data: TicketData) => {
      const doc = new jsPDF({
        format: [80, 180],
        unit: 'mm',
      });
  
      try {
        const response = await fetch(ChaskiLogoB);
        const svgText = await response.text();
  
        const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = 200;
        canvas.height = 150;
  
        const svgImage = new Image();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
  
        svgImage.onload = async () => {
          ctx?.drawImage(svgImage, 0, 0, 200, 150);
          const pngBase64 = canvas.toDataURL('image/png');
  
          doc.addImage(pngBase64, 'PNG', 15, 0, 50, 40);
  
          await generateRestOfPDF(doc, data);
        };
  
        svgImage.src = svgUrl;
      } catch (error) {
        console.error('Error al procesar el logo:', error);
        await generateRestOfPDF(doc, data);
      }
    };
  
    const generateRestOfPDF = async (doc: jsPDF, data: TicketData) => {
      doc.setFontSize(10);
      const centerX = 40;
      let currentY = 22;
      const lineHeight = 4;
  
      const addCenteredText = (text: string, y: number, fontSize: number = 10) => {
        doc.setFontSize(fontSize);
        doc.text(text, centerX, y, { align: 'center' });
      };
  
      const addInfoLine = (label: string, value: string) => {
        doc.setFontSize(8);
        doc.text(`${label}: ${value}`, 5, currentY);
        currentY += lineHeight;
      };
  
      addCenteredText('Av. Elhuesardo xD', currentY, 8);
      currentY += lineHeight;
      addCenteredText('RUC: 1818181818001', currentY, 8);
      currentY += lineHeight;
      addCenteredText('Teléfono: (03) 2 742 358', currentY, 8);
      currentY += lineHeight * 1.5;
  
      doc.setLineWidth(0.1);
      doc.line(5, currentY, 75, currentY);
      currentY += lineHeight;
  
      addCenteredText('BOLETO DE VIAJE', currentY, 10);
      currentY += lineHeight;
      addCenteredText('N° 100 - 000016', currentY, 10);
      currentY += lineHeight * 1.5;
  
      addInfoLine('Fecha', data.dia);
      addInfoLine('Hora Salida', data.horaSalida);
      addInfoLine('Hora Llegada', data.horaLlegada);
      addInfoLine('Bus', data.placa);
      addInfoLine('Origen', data.terminal);
      addInfoLine('Destino', data.destino);
      addInfoLine('Asiento', data.seats.join(', '));
      addInfoLine('Pasajero', `${data.nombres} ${data.apellidos}`);
      addInfoLine(data.tipoDocumento, data.numeroDocumento);
      addInfoLine('Total', `$${data.price.toFixed(2)}`);
  
      const qrData = `Ticket:100-000017,DNI:${data.numeroDocumento},Asiento:${data.seats.join(',')}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);
      doc.addImage(qrCodeDataUrl, 'PNG', 25, currentY, 30, 30);
  
      const pdfBlob = doc.output('blob');
      setPdfBlob(pdfBlob);
      setShowPDF(true);
    };
  
    return (
      <Modal
        isOpen={showPDF}
        onRequestClose={() => setShowPDF(false)}
        style={{
          content: {
            width: '500px',
            height: '800px',
            margin: 'auto',
            overflow: 'hidden',
          },
        }}
      >
        {pdfBlob && (
          <iframe
            src={URL.createObjectURL(pdfBlob)}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
      </Modal>
    );
  };
  
  export default PdfModal;