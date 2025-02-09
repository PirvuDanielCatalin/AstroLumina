import { ReadingResult } from '../../types/planetPositions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { planetSymbols, planetOrder, zodiacSymbols } from '../../constants/astrology';

const calculateSouthNode = (northNodeSign: string, northNodeHouse: string) => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const houses = ['House 1', 'House 2', 'House 3', 'House 4', 'House 5', 'House 6', 
                 'House 7', 'House 8', 'House 9', 'House 10', 'House 11', 'House 12'];
  
  const northNodeSignIndex = signs.indexOf(northNodeSign);
  const northNodeHouseIndex = houses.indexOf(northNodeHouse);
  
  return {
    sign: signs[(northNodeSignIndex + 6) % 12],
    house: houses[(northNodeHouseIndex + 6) % 12]
  };
};

export const generatePlanetPositionsPDF = (result: ReadingResult, userInfo: { name: string, date: string, time: string, location: string }) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Adăugăm fonturile
  doc.addFont('/fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('/fonts/NotoSansSymbols-Regular.ttf', 'NotoSansSymbols', 'normal');
  
  // Add header
  doc.setFont('NotoSans');
  doc.setFontSize(20);
  doc.text('Hartă Astrală', 105, 15, { align: 'center' });
  
  // Add user info
  doc.setFontSize(12);
  doc.text(`Nume: ${userInfo.name}`, 20, 30);
  doc.text(`Dată: ${userInfo.date}`, 20, 37);
  doc.text(`Oră: ${userInfo.time}`, 20, 44);
  doc.text(`Locație: ${userInfo.location}`, 20, 51);

  // Sort planets according to the defined order
  const sortedPlanets = [...result.dynamicTexts].sort((a, b) => {
    const indexA = planetOrder.indexOf(a.planet);
    const indexB = planetOrder.indexOf(b.planet);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Find North Node and calculate South Node
  const northNode = sortedPlanets.find(p => p.planet === 'Nodul Nord');
  let southNode;
  if (northNode) {
    southNode = calculateSouthNode(northNode.sign, northNode.house);
  }

  // Add South Node to the planets list if North Node exists
  if (southNode) {
    sortedPlanets.push({
      planet: 'Nodul Sud',
      sign: southNode.sign,
      house: southNode.house
    });
  }

  // Add planet positions table
  const tableData = sortedPlanets.map(p => {
    const planetSymbol = p.planet === 'Sun' ? 'O' : planetSymbols[p.planet] || '';
    const zodiacSymbol = zodiacSymbols[p.sign] || '';
    
    return [
      `${planetSymbol} ${p.planet}`,
      `${zodiacSymbol} ${p.sign}`,
      p.house
    ];
  });

  (doc as any).autoTable({
    startY: 60,
    head: [['Planetă', 'Semn', 'Casă']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [41, 128, 185], 
      textColor: 255,
      font: 'NotoSans',  
      fontStyle: 'normal'
    },
    styles: { 
      font: 'NotoSansSymbols',  
      fontSize: 12,
      cellPadding: 5,
      halign: 'center',
      textColor: [0, 0, 0],
      lineWidth: 0.1
    },
    didParseCell: function(data: any) {
      if (data.row.section === 'head') {
        data.cell.styles.font = 'NotoSans';
      } else {
        data.cell.styles.font = 'NotoSansSymbols';
      }
    }
  });

  // Add footer
  doc.setFont('NotoSans');
  const today = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Generat la ${today} de AstroLumina`, 105, doc.internal.pageSize.height - 10, { align: 'center' });

  return doc;
};
