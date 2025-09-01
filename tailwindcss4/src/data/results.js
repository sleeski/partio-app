export const calculateResults = (answers, questions) => {
  const statsConfig = ['luonto', 'partiotaidot', 'järjestö', 'kaverit'];
  const THRESHOLD = 10; // Configurable percentage threshold for "Vaakkuva Kuukkeli!"
  const ENABLE_MULTI_HIGHEST_CHECK = true; // Toggleable flag for multi-highest stats check

  // Initialize stats, maxPoints, and minPoints
  let stats = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});
  let maxPoints = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});
  let minPoints = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});

  // Validate inputs
  if (!answers || !questions || !Array.isArray(questions)) {
    console.error('calculateResults - Invalid inputs:', { answers, questions });
    return {
      title: "Vaakkuva Kuukkeli!",
      description: ["Olet monipuolinen partiolainen, jolla on tasapainoiset kiinnostukset kaikilla alueilla."],
      image: "/images/kuukkeli.webp",
      stats,
      maxPoints,
      minPoints
    };
  }

  console.log('calculateResults - answers:', answers); // Log answers object

  questions.forEach(question => {
    // Validate question structure
    if (!question.options || !Array.isArray(question.options)) {
      console.warn(`calculateResults - Invalid question options for ${question.id}:`, question);
      return;
    }

    let maxImpacts = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: { max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY } }), {});
    
    question.options.forEach(option => {
      statsConfig.forEach(stat => {
        const val = option.stats?.[stat] || 0;
        maxImpacts[stat].max = Math.max(maxImpacts[stat].max, val);
        maxImpacts[stat].min = Math.min(maxImpacts[stat].min, val);
      });
    });

    statsConfig.forEach(stat => {
      const impactMax = Number.isFinite(maxImpacts[stat].max) ? maxImpacts[stat].max : 0;
      const impactMin = Number.isFinite(maxImpacts[stat].min) ? maxImpacts[stat].min : 0;
      maxPoints[stat] += impactMax;
      minPoints[stat] += impactMin;
    });

    const answerValue = answers[question.id];
    const option = question.options.find(opt => opt.value === answerValue);
    if (option && option.stats) {
      statsConfig.forEach(stat => {
        const statValue = option.stats[stat] || 0;
        stats[stat] += statValue;
        if (stat === 'luonto' && statValue !== 0) {
          console.log(`Question ${question.id}: luonto += ${statValue}`);
        }
      });
    }
  });

  console.log('calculateResults - raw stats:', stats);
  console.log('calculateResults - maxPoints:', maxPoints);
  console.log('calculateResults - minPoints:', minPoints);

  // Normalize stats to percentages
  statsConfig.forEach(stat => {
    const range = maxPoints[stat] - minPoints[stat];
    stats[stat] = range > 0 
      ? Math.round(((stats[stat] - minPoints[stat]) / range) * 100) 
      : 0;
  });

  console.log('calculateResults - normalized stats:', stats); // Log normalized stats

  // Check if all stats are within THRESHOLD or if multiple stats are tied for highest
  const statValues = Object.values(stats);
  const maxStatValue = statValues.length > 0 ? Math.max(...statValues) : 0;
  const minStatValue = statValues.length > 0 ? Math.min(...statValues) : 0;
  const isWithinThreshold = maxStatValue - minStatValue <= THRESHOLD;

  let selected;
  if (isWithinThreshold) {
    // All stats within THRESHOLD, assign "Vaakkuva Kuukkeli!"
    selected = {
      title: "Vaakkuva Kuukkeli!",
      description: [
        "Olet monipuolinen partiolainen, jolla on tasapainoiset kiinnostukset kaikilla alueilla.",
        "Nautit partiosta monella tavalla, olipa kyse luonnosta, taidoista, järjestötoiminnasta tai kavereista."
      ],
      image: "/images/kuukkeli.webp"
    };
  } else {
    // Find all stats with the maximum value
    let maxStats = [];
    let maxValue = -Infinity;
    for (const [stat, value] of Object.entries(stats)) {
      if (value > maxValue) {
        maxValue = value;
        maxStats = [stat];
      } else if (value === maxValue) {
        maxStats.push(stat);
      }
    }

    console.log('calculateResults - maxStats:', maxStats, 'maxValue:', maxValue); // Log max stats

    if (ENABLE_MULTI_HIGHEST_CHECK && maxStats.length > 1) {
      // Multiple highest stats, assign "Vaakkuva Kuukkeli!"
      selected = {
        title: "Vaakkuva Kuukkeli!",
        description: [
          "Olet tasapainoinen partiolainen, joka nauttii kaikista partion puolista yhtä paljon. Sinulle partio ei ole vain luontoa, kavereita, erätaitoja tai vapaaehtoistyötä, vaan kaikkea tätä yhdessä sopivassa sekoituksessa – kuin irtokarkkipussi täynnä lemppareita.",
          "Nautit tapahtumasta kuin tapahtumasta. Kesällä saatat löytää itsesi piirileiriltä, syksyllä kisaamasta hiki otsalla ja arkipäivinä ihan tavallisesta viikkokokouksesta. Tiedät myös, että hyvä tasapaino syntyy levosta, ja siksi otat aikaa myös muulle kuin partiolle.",
          "Sinulle partion suurin rikkaus on sen monipuolisuus, joka tarjoaa mahdollisuuden tehdä oikeastaan mitä vain. Yhtenä päivänä partio on sinulle luonnosta nauttimista, toisena taitojen teroittamista ja kolmantena ansiomerkeillä leveilyä – ja kaikki tämä hyvässä seurassa!"
        ],
        image: "/images/kuukkeli.webp"
      };
    } else {
      // Single highest stat, pick its profile
      const maxStat = maxStats[0] || 'default'; // Fallback to default if no max stat
      const profileMap = {
        luonto: {
          title: "Vuorisudenpentu!",
          description: [
            "Sinulle partio on ennen kaikkea metsän uunituoreen hapen hengittämistä, sammalen tuoksua ja kuusten kuisketta. Sinulle partio on alkukantainen paluu siihen, mitä ihmisyys todella on: multaa kynsien alla, savu tukassa ja hyttysenpuremia, jotka punoittavat kuin sotamerkit.",
            "Neljän seinän sisällä kuihdut kuin unohdettu huonekasvi, mutta luonnossa tunnet olosi vapaaksi kuin kotka siipensä avattuaan. Baden-Powellin tavoin et kestä sisällä nukkumista, mutta metsässä vaivut talviuneen kuin karhu marraskuussa. Oikea kotisi löytyy syvältä skutsista, jossa kädet tahrautuvat pihkasta ja jossa kuu toimii taskulamppunasi. Kaikista tapahtumista rakastat eniten niitä, joissa asfaltin ja pakokaasun hajun voi korvata aarnimetsän aromeilla.",
            "Karhunhammasraporttisi pääteesi on selkeä: Sinusta ihmiskunnan pitäisi palata juurilleensa: hylätä betoniviidakot ja elää metsästäjä-keräilijöiden malliin."
          ],
          image: "/images/vuorisusi.webp"
        },
        partiotaidot: {
          title: "Vihtaveikko!",
          description: [
            "Sinulle partio ei ole vapaa-aikaa vaan suorittamista: areena, jossa sinä olet ylivoimainen gladiaattori ja muut ovat pelkkiä katsojia. Sinulle tärkeintä ei ole ryhmä, ei ystävyys, ei \"yhdessä tekeminen\", vaan se hetki, kun pokaali heijastaa takaisin sinun oman naamasi; se virne, jolla osoitat muille, kuinka paljon parempi olet.",
            "Partiotaitosi ovat niin kovat, että voisi luulla Partiopojan käsikirjan olevan kirjoitettu sinun mukaasi. Solmut? Ne solmit silmät kiinni, yhdellä kädellä ja vieläpä veden alla. Suunnistus? Sinä et tarvitse karttaa tai kompassia, koska maa itse paljastaa sinulle salaisuutensa: muurahaispesät kumartavat, sammaleet näyttävät suunnan, ja tähdet järjestäytyvät taivaalle kuin nuoleksi. Tulenteko? Nuotion sytyttämiseen riittää tuima katse. Kädentaidot? Japanilaiset ottavat mallia sinun puuliitoksistasi. Ensiapu? Neurokirurgia on sinulle kuin lasten leikkiä.",
            "Espoon Punanen? Syys-SM-kisat? Voittaminen on sinulle niin itsestäänselvää, että kilpailut tuntuvat lähinnä kohteliaisuudelta muille: annat mahdollisuuden nähdä mestarin työssään. Kiertopalkintoa et enää edes kanna kotiin, koska vitriinisi pullistelee jo kuin brittien museot."
          ],
          image: "/images/vihtaveikko.webp"
        },
        järjestö: {
          title: "Viisas Vervetti!",
          description: [
            "Sinulle Partiossa tärkeintä on itse Partioliike ja sen symboliikka. Olet liikkeen kivijalka, sen liekin vartija ja kunnianhimoinen sanansaattaja. Keräät ansiomerkkejä kuin teekkari haalarimerkkejä orientaatioviikolla. Merkkejä on paidassasi jo niin paksu kerros, että se toimii luotiliivinä. Lippukuntapestisi käyvät kuin investointipankkiirin työstä. PJPK:n johtamistehtäväksi aloitit luonnollisesti pienellä: koko maailmanjamboreen johtamisella.",
            "Unelmoit Partioliikkeen Maailmanjärjestön pääsihteerin tehtävistä, ja Hopeasusi on jo postissa. Osaat Partiopojan käsikirjan ulkoa niin tarkasti, että voisit lausua sen takaperin unissasi. Elät järkähtämättä partiolain mukaan: yhtään valhetta ei suustasi ole kuultu — eikä tulla kuulemaan eläessäsi.",
            "Rauhanliikkeen edistäminen on sinulle elämäntyö. Ei olisi ihme, jos voittaisit Nobelin rauhanpalkinnon, mutta tuskin jaksaisit sitä noutaa; eihän sitä edes saa partiopaitaan kiinni!"
          ],
          image: "/images/vervetti.webp"
        },
        kaverit: {
          title: "Velivohveli!",
          description: [
            "Sinulle partio on ennen kaikkea kavereiden kanssa hengaamista: loputonta kikatusta nuotion ympärillä, tarinoita makuupussien suojissa ja suklaapalojen jakamista kädestä käteen. Ilman kavereita partio olisi kuin rinkka täynnä tiiliskiviä: raskas, epämukava ja vailla mitään hauskaa. Sinulle ystävät ovat tähdet, kuu ja kaikki kaunis maailmassa.",
            "Voit vaikka leikkiä kivileikkiä koko viikonlopun, kunhan saat tehdä sen kavereiden kanssa. Sinä et edes huomaa vastoinkäymisiä, koska kavereiden nauru hukuttaa kaiken alleen. Märät sukat, kaatunut teltta ja melkein tuleen syttynyt Viikin kirkko ovat vain tulevia sisäpiirin vitsejä. Mitä edes ovat vastoinkäymiset kuin tilaisuuksia nauraa yhdessä vielä kovempaa?",
            "Sinulle partio on kuin yksi loputon sisaruspiiri, jossa sähkötys ei meinaa loppua koskaan. Ystävyys on elämäsi kompassi, kartta ja taskulamppu."
          ],
          image: "/images/velivohveli.webp"
        },
        default: {
          title: "Vaakkuva Kuukkeli!",
          description: [
            "Olet tasapainoinen partiolainen, joka nauttii kaikista partion puolista yhtä paljon. Sinulle partio ei ole vain luontoa, kavereita, erätaitoja tai vapaaehtoistyötä, vaan kaikkea tätä yhdessä sopivassa sekoituksessa – kuin irtokarkkipussi täynnä lemppareita.",
            "Nautit tapahtumasta kuin tapahtumasta. Kesällä saatat löytää itsesi piirileiriltä, syksyllä kisaamasta hiki otsalla ja arkipäivinä ihan tavallisesta viikkokokouksesta. Tiedät myös, että hyvä tasapaino syntyy levosta, ja siksi otat aikaa myös muulle kuin partiolle.",
            "Sinulle partion suurin rikkaus on sen monipuolisuus, joka tarjoaa mahdollisuuden tehdä oikeastaan mitä vain. Yhtenä päivänä partio on sinulle luonnosta nauttimista, toisena taitojen teroittamista ja kolmantena ansiomerkeillä leveilyä – ja kaikki tämä hyvässä seurassa!"
          ],
          image: "/images/kuukkeli.webp"
        }
      };

      selected = profileMap[maxStat];
    }
  }

  console.log('calculateResults - selected profile:', selected); // Log selected profile

  return {
    ...selected,
    stats,
    maxPoints,
    minPoints
  };
};