// --- TYPES ---
export type Verse = {
  verse: number;
  speaker: string;
  text: string;
};

export type VisualScene = {
  startVerse: number; // The visual appears before this verse
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
};

export type ChapterData = {
  book: string;
  chapter: number;
  visuals: VisualScene[];
  verses: Verse[];
};

// --- DATA STORE ---
export const isaiahChapters: Record<string, ChapterData> = {
  "1": {
    book: "Isaiah",
    chapter: 1,
    // These match your 4 Outline points
    visuals: [
      {
        startVerse: 1,
        title: "Isang amang may mapagrebeldeng mga anak ",
        description: "Verses 1-9",
        imageSrc: "/pictures/Isaiah1-1.jpeg",
        alt: "",
      },
      {
        startVerse: 10,
        title: "Napopoot si Jehova sa pakitang-taong pagsamba",
        description: "Verses 10-17",
        imageSrc: "/visuals/test.jpg",
        alt: "",
      },
      {
        startVerse: 18,
        title: "Ituwid natin ang mga bagay-bagay sa pagitan natin",
        description: "Verses 18-20",
        imageSrc: "/visuals/test.jpg",
        alt: "",
      },
      {
        startVerse: 21,
        title: "Gagawin muling isang tapat na lunsod ang Sion",
        description: "Verses 21-31",
        imageSrc: "/visuals/test.jpg",
        alt: "",
      },
    ],
    verses: [
      {
        verse: 1,
        speaker: "Isaias",
        text: "Ang pangitaing nakita ni Isaias na anak ni Amoz may kinalaman sa Juda at Jerusalem noong panahon nina Uzias, Jotam, Ahaz, at Hezekias, na mga hari ng Juda:",
      },
      {
        verse: 2,
        speaker: "Isaias",
        text: "Dinggin mo, O langit, at pakinggan mo, O lupa, Dahil sinabi ni Jehova:",
      },
      {
        verse: 3,
        speaker: "Jehova",
        text: "“Nagpalaki ako at nag-alaga ng mga anak, Pero nagrebelde sila sa akin. Kilalang-kilala ng toro ang bumili sa kaniya, At alam na alam ng asno ang sabsaban ng nagmamay-ari sa kaniya; Pero hindi ako kilala ng Israel, Ang sarili kong bayan ay hindi kumikilos nang may kaunawaan.”",
      },
      {
        verse: 4,
        speaker: "Isaias",
        text: "Kaawa-awa ang makasalanang bansa, Isang bayang lugmok sa kasalanan, Isang lahi ng masasamang tao, tiwaling mga anak! Iniwan nila si Jehova; Nilapastangan nila ang Banal ng Israel; Tinalikuran nila siya.",
      },
      {
        verse: 5,
        speaker: "Isaias",
        text: "Saan pa ninyo gustong masaktan at patuloy kayong nagrerebelde? Napinsala na ang buong ulo ninyo, At may sakit ang buong puso ninyo.",
      },
      {
        verse: 6,
        speaker: "Isaias",
        text: "Mula talampakan hanggang ulo, walang bahaging malusog. May mga galos at mga pasa at sariwang mga sugat—Ang mga ito ay hindi pa nagagamot o nabebendahan o napalalambot ng langis.",
      },
      {
        verse: 7,
        speaker: "Isaias",
        text: "Tiwangwang ang lupain ninyo. Sunóg ang mga lunsod ninyo. Harap-harapang nilalamon ng mga dayuhan ang mga bunga ng lupain ninyo. Para itong tiwangwang na lupaing winasak ng mga dayuhan.",
      },
      {
        verse: 8,
        speaker: "Isaias",
        text: "Ang anak na babae ng Sion ay naiwang gaya ng isang silungan sa ubasan, Gaya ng isang kubo sa taniman ng pipino, Gaya ng isang lunsod na napapalibutan ng kaaway.",
      },
      {
        verse: 9,
        speaker: "Isaias",
        text: "Kung hindi iniligtas ni Jehova ng mga hukbo ang ilan sa atin, Naging gaya na tayo ng Sodoma At naging katulad ng Gomorra.",
      },
      {
        verse: 10,
        speaker: "Isaias",
        text: "Dinggin ninyo ang salita ni Jehova, kayong mga diktador ng Sodoma. Pakinggan ninyo ang kautusan ng ating Diyos, kayong bayan ng Gomorra.",
      },
      {
        verse: 11,
        speaker: "Jehova",
        text: "“Ano ang pakinabang ko sa marami ninyong handog?” ang sabi ni Jehova. “Sawa na ako sa inyong mga lalaking tupa bilang handog na sinusunog at sa taba ng pinataba ninyong mga hayop, At hindi ako nalulugod sa dugo ng mga batang toro at mga kordero at mga kambing.",
      },
      {
        verse: 12,
        speaker: "Jehova",
        text: "Kapag humaharap kayo sa akin, Sino ang nag-uutos sa inyo na gawin iyan? Niyuyurakan lang ninyo ang mga looban ko.",
      },
      {
        verse: 13,
        speaker: "Jehova",
        text: "Tigilan na ninyo ang pagdadala ng walang-kabuluhang handog na mga butil. Nasusuklam ako sa mga insenso ninyo. Mga bagong buwan, mga sabbath, panawagan para sa mga kombensiyon—Hindi ko na matiis ang paggamit ninyo ng mahika kasabay ng inyong banal na pagtitipon.",
      },
      {
        verse: 14,
        speaker: "Jehova",
        text: "Napopoot ako sa inyong mga bagong buwan at sa inyong mga kapistahan. Naging pabigat sa akin ang mga iyon; Hindi ko na kayang tiisin ang mga iyon.",
      },
      {
        verse: 15,
        speaker: "Jehova",
        text: "At kapag itinataas ninyo ang inyong mga kamay, Hindi ako tumitingin sa inyo. Kahit nananalangin kayo nang maraming ulit, Hindi ako nakikinig; Punô ng dugo ang mga kamay ninyo.",
      },
      {
        verse: 16,
        speaker: "Jehova",
        text: "Maghugas kayo, linisin ninyo ang inyong sarili; Alisin ninyo sa paningin ko ang masasama ninyong gawain; Tigilan na ninyo ang paggawa ng masama.",
      },
      {
        verse: 17,
        speaker: "Jehova",
        text: "Matuto kayong gumawa ng mabuti; hanapin ninyo ang katarungan, Ituwid ninyo ang nang-aapi, Ipagtanggol ninyo ang karapatan ng batang walang ama, At ipaglaban ninyo ang usapin ng biyuda.",
      },
      {
        verse: 18,
        speaker: "Jehova",
        text: "“Halikayo ngayon at ituwid natin ang mga bagay-bagay sa pagitan natin,” ang sabi ni Jehova. “Kahit na ang mga kasalanan ninyo ay gaya ng iskarlata, Mapapuputi ang mga ito na gaya ng niyebe; Kahit na simpula ang mga ito ng telang krimson, Magiging simputi ng lana ang mga ito.",
      },
      {
        verse: 19,
        speaker: "Jehova",
        text: "Kung handa kayong makinig, Kakainin ninyo ang mabubuting bagay sa lupain.",
      },
      {
        verse: 20,
        speaker: "Jehova",
        text: "Pero kung tatanggi kayo at magrerebelde, Lalamunin kayo ng espada, Dahil si Jehova ang nagsabi nito.”",
      },
      {
        verse: 21,
        speaker: "Isaias",
        text: "Ang tapat na lunsod ay naging babaeng bayaran! Dati ay katarungan ang namamayani sa kaniya; Katuwiran ang nakatira noon sa kaniya, Pero ngayon ay mga mamamatay-tao.",
      },
      {
        verse: 22,
        speaker: "Isaias",
        text: "Ang iyong pilak ay naging dumi. At ang iyong serbesa ay may halong tubig.",
      },
      {
        verse: 23,
        speaker: "Isaias",
        text: "Matigas ang ulo ng iyong matataas na opisyal at kasabuwat sila ng mga magnanakaw. Lahat sila ay mahilig sa suhol at naghahabol ng regalo. Hindi nila binibigyan ng katarungan ang mga walang ama, At hindi nakakarating sa kanila ang kaso ng mga biyuda.",
      },
      {
        verse: 24,
        speaker: "Isaias",
        text: "Kaya sinabi ng tunay na Panginoon, si Jehova ng mga hukbo, Ang Makapangyarihan ng Israel:",
      },
      {
        verse: 25,
        speaker: "Jehova",
        text: "“Paparusahan kita, Tutunawin ko ang iyong dumi na parang ginamitan ng lihiya, At aalisin ko ang lahat ng iyong karumihan.",
      },
      {
        verse: 26,
        speaker: "Jehova",
        text: "Bibigyan kitang muli ng mga hukom gaya noong una At ng mga tagapayo gaya noong pasimula. Pagkatapos, tatawagin kang Lunsod ng Katuwiran, Tapat na Bayan.",
      },
      {
        verse: 27,
        speaker: "Jehova",
        text: "Tutubusin ang Sion sa pamamagitan ng katarungan, At ang bayan niyang bumabalik, sa pamamagitan ng katuwiran.",
      },
      {
        verse: 28,
        speaker: "Jehova",
        text: "Ang mga rebelde at ang mga makasalanan ay pupuksaing magkakasama, At ang mga umiiwan kay Jehova ay hahantong sa kanilang wakas.",
      },
      {
        verse: 29,
        speaker: "Jehova",
        text: "Dahil ikahihiya nila ang matitibay na punong ninasa ninyo, At mapapahiya kayo dahil sa mga hardin na pinili ninyo.",
      },
      {
        verse: 30,
        speaker: "Jehova",
        text: "Dahil magiging gaya kayo ng malaking puno na ang mga dahon ay natutuyot, At gaya ng hardin na walang tubig.",
      },
      {
        verse: 31,
        speaker: "Jehova",
        text: "Ang malakas na tao ay magiging gaya ng mga hibla, At ang mga gawa niya, gaya ng siklab; Sabay silang magliliyab, At walang sinumang papatay sa apoy.”",
      },
    ],
  },
  "2": {
    book: "Isaiah",
    chapter: 2,
    visuals: [
      {
        startVerse: 1,
        title: "Inililigaw ng mga pinuno ng Juda ang bayan",
        description: "Verses 1-15",
        imageSrc: "/pictures/Isaiah1-1.jpeg",
        alt: "",
      },
      {
        startVerse: 16,
        title: "Hinatulan ang mapang-akit na mga anak na babae ng Sion",
        description: "Verses 16-26",
        imageSrc: "/visuals/test.jpg",
        alt: "",
      },
    ],
    verses: [
      {
        verse: 1,
        speaker: "Isaias",
        text: "Ito ang nakita ni Isaias na anak ni Amoz may kinalaman sa Juda at Jerusalem:",
      },
      {
        verse: 2,
        speaker: "Isaias",
        text: "Sa huling bahagi ng mga araw, Ang bundok ng bahay ni Jehova Ay itatatag nang matibay at mas mataas pa sa tuktok ng mga bundok, At iyon ay gagawing mas mataas pa sa mga burol, At dadagsa roon ang lahat ng bansa.",
      },
      {
        verse: 3,
        speaker: "Maraming Bayan",
        text: "“Halikayo, umakyat tayo sa bundok ni Jehova, Sa bahay ng Diyos ni Jacob. Tuturuan niya tayo tungkol sa kaniyang mga daan, At lalakad tayo sa kaniyang mga landas.”",
      },
      {
        verse: 3,
        speaker: "Isaias",
        text: "Dahil ang kautusan ay lalabas mula sa Sion, At ang salita ni Jehova mula sa Jerusalem.",
      },
      {
        verse: 4,
        speaker: "Isaias",
        text: "Siya ay hahatol sa mga bansa At magtutuwid ng mga bagay-bagay may kinalaman sa maraming bayan. Pupukpukin nila ang kanilang mga espada para gawin itong araro At ang kanilang mga sibat para gawin itong karit. Walang bansa na magtataas ng espada laban sa ibang bansa, At hindi na rin sila mag-aaral ng pakikipagdigma.",
      },
      {
        verse: 5,
        speaker: "Isaias",
        text: "O sambahayan ni Jacob, halikayo, Lumakad tayo sa liwanag ni Jehova.",
      },
      {
        verse: 6,
        speaker: "Isaias (Addressing Jehovah)",
        text: "Pinabayaan mo ang iyong bayan, ang sambahayan ni Jacob, Dahil napuno sila ng mga bagay mula sa Silangan; Nagsasagawa sila ng mahika gaya ng mga Filisteo, At marami silang mga anak ng banyaga.",
      },
      {
        verse: 7,
        speaker: "Isaias",
        text: "Ang lupain nila ay punô ng pilak at ginto, At hindi mabilang ang kayamanan nila. Ang lupain nila ay punô ng kabayo, At hindi mabilang ang karwahe nila.",
      },
      {
        verse: 8,
        speaker: "Isaias",
        text: "Ang lupain nila ay punô ng walang-silbing mga diyos. Yumuyukod sila sa gawa ng sarili nilang mga kamay, Sa ginawa ng sarili nilang mga daliri.",
      },
      {
        verse: 9,
        speaker: "Isaias",
        text: "Kaya ibinababa niya ang sarili niya at ginagawang hamak, At talagang hindi mo sila mapatatawad.",
      },
      {
        verse: 10,
        speaker: "Isaias",
        text: "Pumasok kayo sa mga bitak ng malaking bato at magtago kayo sa alabok Dahil sa nakakatakot na presensiya ni Jehova At sa kaniyang maluwalhating kadakilaan.",
      },
      {
        verse: 11,
        speaker: "Isaias",
        text: "Ang mapagmataas na mga mata ng tao ay ibababa, At ang kahambugan ng mga tao ay yuyuko. Si Jehova lang ang dadakilain sa araw na iyon.",
      },
      {
        verse: 12,
        speaker: "Isaias",
        text: "Dahil ang araw na iyon ay kay Jehova ng mga hukbo. Darating iyon sa lahat ng mapagmataas at hambog, Sa lahat, dakila man o nakabababa,",
      },
      {
        verse: 13,
        speaker: "Isaias",
        text: "Sa lahat ng punong sedro ng Lebanon na matayog at mataas At sa lahat ng punong ensina ng Basan,",
      },
      {
        verse: 14,
        speaker: "Isaias",
        text: "Sa lahat ng matatayog na bundok At sa lahat ng matataas na burol,",
      },
      {
        verse: 15,
        speaker: "Isaias",
        text: "Sa bawat mataas na tore at matibay na pader,",
      },
      {
        verse: 16,
        speaker: "Isaias",
        text: "Sa lahat ng barko ng Tarsis At sa lahat ng kanais-nais na bangka.",
      },
      {
        verse: 17,
        speaker: "Isaias",
        text: "Ang pagmamataas ng tao ay ibababa, At ang kahambugan ng mga tao ay yuyuko. Si Jehova lang ang dadakilain sa araw na iyon.",
      },
      {
        verse: 18,
        speaker: "Isaias",
        text: "Ang walang-silbing mga diyos ay lubusang maglalaho.",
      },
      {
        verse: 19,
        speaker: "Isaias",
        text: "At ang mga tao ay magtatago sa mga kuweba sa batuhan At sa mga hukay sa lupa, Dahil sa nakakatakot na presensiya ni Jehova At sa kaniyang marilag na kadakilaan, Kapag kumilos siya para panginigin sa takot ang lupa.",
      },
      {
        verse: 20,
        speaker: "Isaias",
        text: "Sa araw na iyon ay kukunin ng mga tao ang kanilang walang-silbing mga diyos na pilak at ginto, Na ginawa nila para yukuran, At itatapon nila ang mga iyon sa mga daga at paniki,",
      },
      {
        verse: 21,
        speaker: "Isaias",
        text: "Para makapasok sila sa mga butas ng bato At sa mga bitak ng malalaking bato, Dahil sa nakakatakot na presensiya ni Jehova At sa kaniyang marilag na kadakilaan, Kapag kumilos siya para panginigin sa takot ang lupa.",
      },
      {
        verse: 22,
        speaker: "Isaias",
        text: "Para sa sarili ninyong kapakanan, huwag na kayong magtiwala sa hamak na tao, Na nabubuhay lang dahil sa hininga sa kaniyang ilong. Bakit kayo aasa sa kaniya?",
      },
    ],
  },
};
