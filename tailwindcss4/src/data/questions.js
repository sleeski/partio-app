export default [
  {
    category: "Väittämiä",
    subtitle: "Tässä osassa sinulle esitetään eri väittämiä. Vastaa sen perusteella, kuinka hyvin väittämä kuvaa sinua.",
    questions: [
      {
        text: "En nuku missään, missä ei ole sänkyä, pistorasiaa tai jonne ei voi Woltata.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { luonto: 2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { luonto: 1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { luonto: -1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { luonto: -2 } }
        ]
      },
      {
        text: "Pystyn rakentamaan vaikka talon pelkillä rangoilla ja köytöksillä.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { partiotaidot: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { partiotaidot: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { partiotaidot: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { partiotaidot: 2 } }
        ]
      },
      {
        text: "En lähde mihinkään partiotapahtumaan ellei siellä ole tuttuja.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { kaverit: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { kaverit: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { kaverit: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { kaverit: 2 } }
        ]
      },
      {
        text: "Partiopaitaani ei erota kaikkien merkkieni alta.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { järjestö: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { järjestö: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { järjestö: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { järjestö: 2 } }
        ]
      },
      {
        text: "Kun muut nukkuvat kotona kissojen kanssa, minä nukun korvessa karhun kainalossa.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { luonto: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { luonto: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { luonto: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { luonto: 2 } }
        ]
      },
      {
        text: "On aina mahtavaa tavata uusia ihmisiä partiossa.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { kaverit: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { kaverit: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { kaverit: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { kaverit: 2 } }
        ]
      },
      {
        text: "Puolari nousee minulta viidessä minuutissa ja laavuun riittää puolikas.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { partiotaidot: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { partiotaidot: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { partiotaidot: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { partiotaidot: 2 } }
        ]
      },
      {
        text: "Minulla tuskin riittää vapaa-aikaa kaikkien partiopestieni vuoksi.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { järjestö: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { järjestö: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { järjestö: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { järjestö: 2 } }
        ]
      },
      {
        text: "Unelmani on asua puunlatvassa ja kommunikoida lintujen kanssa.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { luonto: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { luonto: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { luonto: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { luonto: 2 } }
        ]
      },
      {
        text: "En tiedä tylsempää tapahtumaa kuin partioparaati.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { järjestö: 2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { järjestö: 1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { järjestö: -1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { järjestö: -2 } }
        ]
      },
      {
        text: "Iltanuotiolla jutustelu on niin mukavaa, että tuskin maltan mennä nukkumaan.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { kaverit: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { kaverit: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { kaverit: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { kaverit: 2 } }
        ]
      },
      {
        text: "Minua ei kannata päästää lähellekään puukkoja tai muuten lähtee sormia.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { partiotaidot: 2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { partiotaidot: 1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { partiotaidot: -1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { partiotaidot: -2 } }
        ]
      },
      {
        text: "Pyrin tekemään joka päivä yhden hyvän työn partiolain mukaisesti.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { järjestö: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { järjestö: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { järjestö: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { järjestö: 2 } }
        ]
      },
      {
        text: "Kuljen metsässä mieluummin yksin kuin porukalla. Luonnossa ei pitäisi joutua kestämään muita ihmisiä.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { kaverit: 2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { kaverit: 1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { kaverit: -1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { kaverit: -2 } }
        ]
      },
      {
        text: "Lohenpyrstöliitokset ovat intohimoni.",
        options: [
          { value: 1, label: "Täysin eri mieltä", stats: { partiotaidot: -2 } },
          { value: 2, label: "Jokseenkin eri mieltä", stats: { partiotaidot: -1 } },
          { value: 3, label: "Ei samaa eikä eri mieltä", stats: {} },
          { value: 4, label: "Jokseenkin samaa mieltä", stats: { partiotaidot: 1 } },
          { value: 5, label: "Täysin samaa mieltä", stats: { partiotaidot: 2 } }
        ]
      },
    ]
  },
  {
    category: "Lauseita",
    subtitle: "Tässä osassa sinulle esitetään keskeneräinen lause, jonka sinun tulee päättää sillä vaihdoehdolla, joka kuvastaa sinua parhaiten.",
    questions: [
      {
        text: "Partiossa minulle on tärkeintä...",
        options: [
          { value: 1, label: "luonnon maisemien tuoma mielenrauha", stats: { luonto: 2 } },
          { value: 2, label: "partiotaitojeni kehittäminen", stats: { partiotaidot: 2 } },
          { value: 3, label: "karkkien syönti", stats: {} },
          { value: 4, label: "ansiomerkit", stats: { järjestö: 2 } },
          { value: 5, label: "kavereiden kanssa hengaaminen", stats: { kaverit: 2 } }
        ]
      },
      {
        text: "Lempparipartiotapahtumiani ovat...",
        options: [
          { value: 1, label: "partiotaitokilpailut", stats: { partiotaidot: 2 } },
          { value: 2, label: "retket ja vaellukset", stats: { luonto: 2 } },
          { value: 3, label: "viikkokokoukset", stats: {} },
          { value: 4, label: "leirit", stats: { kaverit: 2 } },
          { value: 5, label: "paraatit", stats: { järjestö: 2 } }
        ]
      },
      {
        text: "Partio tarkoittaa minulle...",
        options: [
          { value: 1, label: "merkkejä ja vapaaehtoistyötä", stats: { järjestö: 2 } },
          { value: 2, label: "pientä sotilaallista kokoonpanoa", stats: {} },
          { value: 3, label: "kisoja, suorittamista ja mitaleja", stats: { partiotaidot: 2 } },
          { value: 4, label: "uusia ystäviä", stats: { kaverit: 2 } },
          { value: 5, label: "luonnossa liikkumista", stats: { luonto: 2 } }
        ]
      },
      {
        text: "Leireillä suurin osa ajastani kuluu...",
        options: [
          { value: 1, label: "leirirakennelmien ja tulien tekoon", stats: { partiotaidot: 2 } },
          { value: 2, label: "juttelemalla muiden kanssa", stats: { kaverit: 2 } },
          { value: 3, label: "jossain pestissä", stats: { järjestö: 2 } },
          { value: 4, label: "somen skrollailuun", stats: {} },
          { value: 5, label: "puita halaillessa", stats: { luonto: 2 } }
        ]
      },
      {
        text: "Ykköstavoitteeni partiossa on...",
        options: [
          { value: 1, label: "Ko-Gi-kurssi ja Hopeasusi", stats: { järjestö: 2 } },
          { value: 2, label: "partiotaitojen Suomen-mestaruus", stats: { partiotaidot: 2 } },
          { value: 3, label: "Partiosta eroaminen", stats: {} },
          { value: 4, label: "Pacific Crest Trailin läpivaellus", stats: { luonto: 2 } },
          { value: 5, label: "tehdä unohtumattomia muistoja kavereiden kanssa", stats: { kaverit: 2 } }
        ]
      },
      {
        text: "Todellinen partiolainen...",
        options: [
          { value: 1, label: "on avulias, kohtelias, huomaavainen ja luotettava", stats: { järjestö: 2 } },
          { value: 2, label: "on eläinten ystävä", stats: { luonto: 2 } },
          { value: 3, label: "on jokaisen toveri", stats: { kaverit: 2 } },
          { value: 4, label: "avaa adventtikalenterin luukut etuajassa", stats: {} },
          { value: 5, label: "on oikea eräjorma", stats: { partiotaidot: 2 } }
        ]
      },
    ]
  }
];