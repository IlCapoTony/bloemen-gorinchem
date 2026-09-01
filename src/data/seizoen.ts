/**
 * Seizoensbloemen per maand, uit Nederlandse teelt.
 *
 * Het seizoensblok op de homepage haalde zijn maandnaam eerder uit een vaste
 * tekst en liep daardoor achter zodra er een ronde overheen ging. Nu staat elke
 * maand hier apart en kiest de pagina er zelf de juiste bij, zodat kop, tekst
 * en vraag altijd over dezelfde maand gaan.
 */
export interface SeizoensMaand {
  /** Maandnaam in het Nederlands, kleine letter, zoals hij in een zin past. */
  maand: string;
  /** Bloemen die in deze maand uit Nederlandse teelt op de veiling komen. */
  bloemen: string;
  /** Eén alinea context bij het aanbod van deze maand. */
  toelichting: string;
  /** Praktische tip die specifiek voor deze maand hout snijdt. */
  tip: string;
}

const SEIZOEN: Record<number, SeizoensMaand> = {
  1: {
    maand: 'januari',
    bloemen: 'tulpen, hyacinten, narcissen, amaryllis en anemonen',
    toelichting:
      'Januari is de maand van de eerste Nederlandse bolbloemen. Tulpen, hyacinten en narcissen komen uit kassen en koelcellen in eigen land en zijn daarmee ruim voorhanden, terwijl zomerbloemen in deze maand van ver moeten komen.',
    tip: 'Tulpen groeien op de vaas nog een paar centimeter door: zet ze in een vaas die hoog genoeg is en ververs het water om de dag. Snijd de stelen recht af, niet schuin.',
  },
  2: {
    maand: 'februari',
    bloemen: 'tulpen, narcissen, ranonkels, anemonen en de eerste seringen',
    toelichting:
      'Februari staat vol met bolbloemen uit Nederlandse teelt. Rond Valentijnsdag gaat de aandacht vooral naar rozen, maar die komen doorgaans uit het buitenland; de tulpen en ranonkels naast de rozen zijn van hier.',
    tip: 'Rond Valentijnsdag is het de drukste week van het jaar. Bestel een paar dagen vooruit als u iets specifieks wilt, en houd er rekening mee dat rozen dan schaarser en duurder zijn.',
  },
  3: {
    maand: 'maart',
    bloemen: 'narcissen, tulpen, ranonkels, seringen en blauwe druifjes',
    toelichting:
      'In maart komt het voorjaarsaanbod op gang. Narcissen en tulpen zijn op hun best en er komen takken bij: sering, forsythia en de eerste bloesem uit Nederlandse teelt.',
    tip: 'Narcissen geven een slijmerig sap af dat andere bloemen slecht verdraagt. Laat ze eerst een paar uur apart staan, of vraag de bloemist ze in een gemengd boeket te verwerken.',
  },
  4: {
    maand: 'april',
    bloemen: 'tulpen, ranonkels, anjers, seringen en de eerste pioenrozen',
    toelichting:
      'April is een overgangsmaand: de laatste bolbloemen en het eerste voorjaarswerk lopen door elkaar. Tegen het eind van de maand komen de vroegste Nederlandse pioenrozen op de veiling.',
    tip: 'Seringen drinken veel. Zet ze in een ruime vaas met flink wat water en verwijder het blad onder de waterlijn, dan houden ze het aanzienlijk langer vol.',
  },
  5: {
    maand: 'mei',
    bloemen: 'pioenrozen, seringen, lelietjes-van-dalen, ranonkels en clematis',
    toelichting:
      'Mei is pioenrozenmaand. Het Nederlandse seizoen duurt maar een paar weken en juist dan is de kwaliteit het hoogst en de prijs het gunstigst. Ook lelietjes-van-dalen zijn nu kort verkrijgbaar.',
    tip: 'Koop pioenrozen als bol, niet in volle bloei: ze openen zich thuis in twee tot drie dagen en gaan dan het langst mee.',
  },
  6: {
    maand: 'juni',
    bloemen: 'pioenrozen, delphinium, korenbloemen, lathyrus en de eerste zomerbloemen',
    toelichting:
      'In juni komt de Nederlandse zomerteelt op gang. Naast de laatste pioenrozen verschijnen delphinium, korenbloem en lathyrus — bloemen die zich goed lenen voor een luchtig, veldachtig boeket.',
    tip: 'Bruidswerk piekt in juni. Wilt u bruidsboeketten of tafelwerk laten maken, reken dan op een afspraak weken tot maanden vooruit.',
  },
  7: {
    maand: 'juli',
    bloemen: 'zonnebloemen, lisianthus, hortensia’s, gladiolen en zomerasters',
    toelichting:
      'Juli levert het breedste zomeraanbod van Nederlandse bodem. Zonnebloemen, hortensia’s en lisianthus komen van eigen teelt en zijn daardoor zowel goedkoper als verser dan bloemen die buiten hun seizoen ingevlogen worden.',
    tip: 'Bij warm weer is water de bepalende factor. Vraag om een boeket dat net is opgemaakt, houd het onderweg uit de auto in de volle zon en ververs thuis dagelijks het water.',
  },
  8: {
    maand: 'augustus',
    bloemen: 'dahlia’s, zonnebloemen, zinnia’s, gladiolen en hortensia’s',
    toelichting:
      'Augustus is een van de rijkste bloemenmaanden van het jaar in Nederland. Dahlia’s, zonnebloemen, zinnia’s, gladiolen en hortensia’s komen dan uit Nederlandse teelt van de veiling, aangevuld met lisianthus en de eerste chrysanten.',
    tip: 'Vraag bij warm weer om een boeket dat net is opgemaakt in plaats van eentje dat al een dag in de emmer staat, en zet het thuis niet in de volle zon.',
  },
  9: {
    maand: 'september',
    bloemen: 'dahlia’s, chrysanten, asters, hortensia’s en zonnebloemen',
    toelichting:
      'September is de maand waarin het zomeraanbod overloopt in het najaar. Dahlia’s en chrysanten zijn op hun hoogtepunt en de hortensia’s verkleuren naar roodbruin en groen — juist die verkleurde koppen drogen goed en blijven daarna nog maanden mooi.',
    tip: 'Het najaarsaanbod komt grotendeels van de Nederlandse buitenteelt en wisselt dus per week met het weer. Wilt u zeker weten dat een bepaalde soort er is, bel dan even vooruit.',
  },
  10: {
    maand: 'oktober',
    bloemen: 'chrysanten, dahlia’s, hortensia’s, hypericum en bessentakken',
    toelichting:
      'Oktober is chrysantenmaand. Nederland is de grootste chrysantenteler van Europa en het aanbod is in deze maand op zijn breedst, van grootbloemig tot tros. Daarnaast komen er veel bessen-, tak- en vruchtmaterialen bij.',
    tip: 'Rond Allerheiligen en Allerzielen loopt de vraag naar rouw- en grafwerk sterk op. Geef een opdracht voor die dagen ruim van tevoren door.',
  },
  11: {
    maand: 'november',
    bloemen: 'chrysanten, amaryllis, hypericum, eucalyptus en dennengroen',
    toelichting:
      'In november verschuift het aanbod naar houdbaar werk: chrysanten, bessentakken en groen. De eerste Nederlandse amaryllissen komen op de veiling en dat zijn dankbare bloemen voor een donkere maand.',
    tip: 'Amaryllis heeft een holle steel die kan inscheuren. Vraag de bloemist er een stokje in te zetten, dan blijft de bloem rechtop staan tot hij helemaal open is.',
  },
  12: {
    maand: 'december',
    bloemen: 'amaryllis, kerstster, hyacinten, anjers en dennen- en hulstgroen',
    toelichting:
      'December draait om amaryllis, kerstster en bolbloemen op pot, aangevuld met dennen-, hulst- en eucalyptusgroen voor kransen en tafelstukken. Vrijwel al dat materiaal komt uit Nederlandse kassen en kwekerijen.',
    tip: 'Kerststerren kunnen niet tegen kou: laat de plant goed inpakken voor onderweg en zet hem thuis niet op een tochtige plek of vlak bij een buitendeur.',
  },
};

/** Het seizoensblok dat hoort bij de maand van een ISO-datum. */
export const seizoenVoor = (iso: string): SeizoensMaand =>
  SEIZOEN[new Date(iso).getUTCMonth() + 1] ?? SEIZOEN[1];
