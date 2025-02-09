import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Loading effect
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      question: "Ce informații sunt necesare pentru o lectură astrologică?",
      answer: "Pentru o lectură astrologică precisă, sunt necesare data nașterii (zi, lună, an), ora exactă a nașterii și locul nașterii (oraș, țară). Aceste detalii sunt esențiale pentru calcularea poziției exacte a planetelor în momentul nașterii."
    },
    {
      question: "Cât durează o ședință de consiliere astrologică?",
      answer: "O ședință standard durează aproximativ 60 de minute. În acest timp, analizăm harta natală, tranzitele curente și răspund la întrebările specifice pe care le aveți. Pentru cazuri mai complexe, putem programa ședințe mai lungi de 90 de minute."
    },
    {
      question: "Cum se desfășoară o consultație online?",
      answer: "Consultațiile online se desfășoară prin platforme de video conferință (Zoom, Skype, etc.). Veți primi un link înainte de ședință, iar materialele și interpretările vor fi trimise pe email după consultație."
    },
    {
      question: "Ce este o sinastrie și când este utilă?",
      answer: "Sinastria este comparația între două hărți astrologice, utilă pentru înțelegerea dinamicii relațiilor. Este recomandată pentru cupluri, parteneri de afaceri sau pentru înțelegerea relației părinte-copil."
    },
    {
      question: "Cum mă pregătesc pentru o consultație astrologică?",
      answer: "Pregătiți-vă o listă cu întrebări specifice pe care doriți să le adresați. Asigurați-vă că aveți informațiile exacte despre naștere și fiți deschiși să împărtășiți contextul situațiilor despre care doriți să discutăm."
    },
    {
      question: "Ce reprezintă tranzitele și de ce sunt importante?",
      answer: "Tranzitele reprezintă pozițiile curente ale planetelor în raport cu harta dvs. natală. Acestea indică perioade importante de oportunități, provocări și transformări în viața dvs."
    },
    {
      question: "Cât de des este recomandat să fac o consultație astrologică?",
      answer: "Recomand o consultație detaliată la fiecare 6-12 luni pentru a analiza ciclurile majore. Pentru situații specifice sau perioade de tranziție, putem programa ședințe suplimentare focusate pe aspectele respective."
    },
    {
      question: "Pot primi înregistrarea consultației?",
      answer: "Da, la cerere, pot înregistra consultația și vă pot trimite înregistrarea după ședință. Acest lucru vă permite să revedeți informațiile și să le procesați în ritmul propriu."
    },
    {
      question: "Ce metode de plată acceptați?",
      answer: "Accept plăți prin transfer bancar, card (Revolut, PayPal) și alte metode electronice. Detaliile complete de plată vor fi furnizate după programarea consultației."
    },
    {
      question: "Cum pot reprograma sau anula o programare?",
      answer: "Reprogramările sau anulările trebuie făcute cu cel puțin 24 de ore înainte de consultație. Contactați-mă prin email sau telefon pentru a face modificările necesare."
    },
    {
      question: "Ce este o temă natală și ce informații îmi poate oferi?",
      answer: "Tema natală este o hartă a cerului în momentul nașterii dvs. Aceasta oferă informații despre personalitate, talente înnăscute, provocări potențiale și oportunități în diferite aspecte ale vieții precum carieră, relații și dezvoltare personală."
    },
    {
      question: "Cum pot folosi astrologia în luarea deciziilor importante?",
      answer: "Astrologia poate fi folosită ca instrument de timing și planificare strategică. Analizăm perioadele favorabile pentru diferite tipuri de acțiuni și identificăm momentele optime pentru decizii importante în carieră, relații sau investiții."
    },
    {
      question: "Ce sunt nodurile lunare și cum îmi influențează viața?",
      answer: "Nodurile lunare reprezintă puncte matematice care indică direcția karmică a vieții dvs. Nodul Nord arată direcția de creștere și dezvoltare, în timp ce Nodul Sud reprezintă abilitățile și patterns-urile din trecut care trebuie echilibrate."
    },
    {
      question: "Cum interpretați retrogradările planetare?",
      answer: "Retrogradările sunt perioade când planetele par să se miște înapoi pe cer. Acestea sunt momente ideale pentru revizuire, reflecție și reajustare în domeniile vieții guvernate de planeta respectivă."
    },
    {
      question: "Ce rol au casele astrologice în interpretare?",
      answer: "Casele astrologice reprezintă diferite domenii ale vieții precum identitatea personală, resurse, comunicare, familie, creativitate, muncă, relații, etc. Poziția planetelor în case indică unde se manifestă cel mai puternic energiile lor."
    },
    {
      question: "Cum pot folosi astrologia pentru dezvoltare personală?",
      answer: "Astrologia oferă insight-uri despre ciclurile personale de creștere, punctele forte și provocările individuale. Putem identifica perioade optime pentru diferite tipuri de dezvoltare personală și profesională."
    },
    {
      question: "Ce sunt aspectele planetare și ce importanță au?",
      answer: "Aspectele sunt unghiurile dintre planete care indică cum interacționează energiile lor. Ele pot fi armonioase (trigoane, sextile) sau provocatoare (pătrate, opoziții), fiecare oferind oportunități unice de creștere."
    },
    {
      question: "Cum se calculează compatibilitatea astrologică?",
      answer: "Compatibilitatea se analizează prin compararea hărților natale ale două persoane (sinastrie) și crearea unei hărți compuse. Se studiază aspectele dintre planete, elementele dominante și plasamentele în case."
    },
    {
      question: "Ce sunt progresiile și care este rolul lor?",
      answer: "Progresiile sunt o tehnică de predicție care arată evoluția naturală a personalității și circumstanțelor de viață. Ele oferă informații despre dezvoltarea interioară și schimbările graduale în timp."
    },
    {
      question: "Cum pot integra astrologia cu alte practici spirituale?",
      answer: "Astrologia poate fi complementară cu meditația, yoga, terapia sau alte practici spirituale. Ea oferă timing-ul optim pentru diferite tipuri de practici și ajută la înțelegerea ciclurilor personale de creștere spirituală."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="relative min-h-screen">
      {/* Starry background - fixed position */}
      <div className="fixed inset-0 bg-black stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Navbar */}
      <Navbar isScrolled={isScrolled} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Contactează-mă</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-amber-700 mb-2">Nume complet</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-amber-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-amber-700 mb-2">Telefon (opțional)</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-amber-700 mb-2">Subiect</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-amber-700 mb-2">Mesaj</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  Trimite mesaj
                </button>
              </form>
            </div>

            {/* FAQ Section with fixed height and scroll */}
            <div>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Întrebări frecvente</h2>
              <div className="relative">
                <div className="h-[750px] overflow-y-auto pr-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
                  {/* Gradient overlay at the bottom to indicate more content */}
                  <div className="absolute bottom-0 left-0 right-4 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  
                  {/* FAQ Items */}
                  <div className="space-y-4 pb-32">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-amber-100 last:border-0">
                        <button
                          className="w-full text-left py-4 flex justify-between items-center text-amber-800 hover:text-amber-600"
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                          <span className="font-medium">{item.question}</span>
                          <span className="transform transition-transform duration-200">
                            {openFaq === index ? '−' : '+'}
                          </span>
                        </button>
                        {openFaq === index && (
                          <div className="pb-4 text-amber-700">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
