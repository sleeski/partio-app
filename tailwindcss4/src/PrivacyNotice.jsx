import { useNavigate } from 'react-router-dom';

function PrivacyNotice() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <div className="flex justify-center p-4 flex-grow">
        <div className="bg-base-100 rounded-box p-6 max-w-lg w-full min-h-[500px] border-3">
          <div className="flex flex-col min-h-[500px] relative">
            <button onClick={handleGoBack} className="btn btn-ghost mb-4 absolute top-0 left-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left-icon lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Takaisin
            </button>
            <h1 className="text-3xl font-bold mt-12 mb-6 text-neutral">
              Tietosuojakuvaus
            </h1>
            <div className="text-neutral space-y-4 mb-12">
              <p>
                Vastaajien yksityisyys ja tiedon läpinäkyvyys on meille Vihtaveikoille äärimmäisen tärkeää. Siksi kyselyyn syötetyt vastaukset, tulokset ja kaikki muut käyttäjästä kerätyt tiedot, mukaan lukien biometriset tunnisteet (kuten sormenjäljet, käyttäjän lukunopeus, värinäkö sekä puheen perusteella tunnistetut reaktiot kysymyksiin), tallennetaan ulkomailla sijaitsevaan tietokantaamme, jotta voimme pitää niistä hyvää huolta – niin sinun ei tarvitse. Kyselyn analytiikan avulla kerättyjen tietojen käsittelyyn vaikuttavat ensisijaisesti lippukuntaretkillä ja -leireillä tekemäsi evästevalinnat (esim. oletko ostanut karkkeja yli kahdella eurolla). Turvallisuuden takaamiseksi tietoja ei voi tarkastaa, oikaista eikä poistaa mitenkään.
              </p>
              <p>
                Vihtaveikot käyttävät tietoja luottamuksellisesti kohdennetun partiotoiminnan kehittämiseen, niin Viikin Vesikoissa kuin muissa partio- ja nuorisojärjestöissä (esim. PoRa, LäRVit, Jousi). Erityisesti tietoja käytetään kouluttamaan Vihtaveikkojen ja Aalto-yliopiston yhteistä partiokielimallia, jota käytetään äärimmäisten elämyksien ideoinnissa, kehittämisessä ja toteuttamisessa. Tietoja saatetaan myös käyttää ratkaisemaan Hiipivä Haamu -salapoliisikilpailun ennakkotehtäviä.
              </p>
              <p>
                Tiedot jaetaan vain Vihtaveikkojen yhteistyökumppaneille: Suomen Partiolaisille, Aalto-yliopistolle ja Puolustusvoimille. Vihtaveikot pidättävät kuitenkin pelkästään voittoa tavoittelevana järjestönä oikeuden, rahallisissa vaikeuksissa (esim. jos Viikin Vesikoiden jäsenmaksut eivät enää mene täysin Vihtaveikkojen vuosibudjettiin) myydä tiedot korkeimmalle tarjoajalle riippumatta tämän tahon luotettavuudesta tai moraalisuudesta. Vihtaveikot eivät ota mitään vastuuta siitä, mitä muut sidosryhmät tiedoilla tai tietojen perusteella tekevät.
              </p>
              <p>
                Lisätietoja tietosuojakäytännöistämme ja muusta toiminnastamme voi tiedustella kirjekyyhkyitse osoitteesta Jäynääjäntie 9, 12001 Helsinki tai Viikin Vesikoiden lippukuntaretkiltä.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col max-w-4xl mx-auto py-4">
        <div className="divider"></div>
        <footer className="text-center py-2">
          <div className="flex items-center justify-center mb-2">
            <span className="text-neutral text-2xl font-bold">VIHTAVEIKOT</span>
          </div>
          <a
            href="/privacy-notice"
            className="text-neutral font-bold hover:text-primary text-sm"
          >
            Tietosuoja
          </a>
        </footer>
      </div>
    </div>
  );
}

export default PrivacyNotice;