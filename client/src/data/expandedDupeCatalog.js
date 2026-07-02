const note = (name, category = '') => ({ name, category })

const productImages = {
  'afnan-modest-une': '/images/perfumes/expanded/afnan-modest-une.webp',
  'afnan-supremacy-not-only-intense': '/images/perfumes/expanded/afnan-supremacy-not-only-intense.webp',
  'afnan-turathi-blue': '/images/perfumes/expanded/afnan-turathi-blue.webp',
  'ajmal-evoke-gold-for-him': '/images/perfumes/expanded/ajmal-evoke-gold-for-him.webp',
  'al-haramain-amber-oud-gold-edition': '/images/perfumes/expanded/al-haramain-amber-oud-gold-edition.webp',
  'al-haramain-detour-noir': '/images/perfumes/expanded/al-haramain-detour-noir.webp',
  'amouage-reflection-man': '/images/perfumes/expanded/amouage-reflection-man.webp',
  'armaf-club-de-nuit-blue-iconic': '/images/perfumes/expanded/armaf-club-de-nuit-blue-iconic.webp',
  'armaf-club-de-nuit-man': '/images/perfumes/expanded/armaf-club-de-nuit-man.jpg',
  'armaf-club-de-nuit-milestone': '/images/perfumes/expanded/armaf-club-de-nuit-milestone.webp',
  'armaf-club-de-nuit-sillage': '/images/perfumes/expanded/armaf-club-de-nuit-sillage.png',
  'armaf-club-de-nuit-untold': '/images/perfumes/expanded/armaf-club-de-nuit-untold.png',
  'armaf-club-de-nuit-woman': '/images/perfumes/expanded/armaf-club-de-nuit-woman.png',
  'armaf-craze': '/images/perfumes/expanded/armaf-craze.jpg',
  'armaf-futura-la-homme': '/images/perfumes/expanded/armaf-futura-la-homme.jpg',
  'armaf-legesi': '/images/perfumes/expanded/armaf-legesi.webp',
  'armaf-tres-nuit': '/images/perfumes/expanded/armaf-tres-nuit.jpg',
  'armani-acqua-di-gio-profumo': '/images/perfumes/expanded/armani-acqua-di-gio-profumo.jpg',
  'armani-stronger-with-you-intensely': '/images/perfumes/expanded/armani-stronger-with-you-intensely.jpg',
  'bvlgari-tygar': '/images/perfumes/expanded/bvlgari-tygar.jpg',
  'byredo-bal-d-afrique': '/images/perfumes/expanded/byredo-bal-d-afrique.webp',
  'carolina-herrera-good-girl': '/images/perfumes/expanded/carolina-herrera-good-girl.webp',
  'chanel-bleu-de-chanel': '/images/perfumes/expanded/chanel-bleu-de-chanel.jpg',
  'chanel-coco-mademoiselle': '/images/perfumes/expanded/chanel-coco-mademoiselle.webp',
  'creed-green-irish-tweed': '/images/perfumes/expanded/creed-green-irish-tweed.webp',
  'creed-millesime-imperial': '/images/perfumes/expanded/creed-millesime-imperial.webp',
  'creed-silver-mountain-water': '/images/perfumes/expanded/creed-silver-mountain-water.webp',
  'dior-homme-original': '/images/perfumes/expanded/dior-homme-original.jpg',
  'dior-sauvage-elixir': '/images/perfumes/expanded/dior-sauvage-elixir.jpg',
  'fragrance-world-after-effect': '/images/perfumes/expanded/fragrance-world-after-effect.webp',
  'fragrance-world-barakkat-gentle-gold': '/images/perfumes/expanded/fragrance-world-barakkat-gentle-gold.jpg',
  'fragrance-world-eau-de-spice-extreme': '/images/perfumes/expanded/fragrance-world-eau-de-spice-extreme.jpg',
  'fragrance-world-essence-de-blanc': '/images/perfumes/expanded/fragrance-world-essence-de-blanc.webp',
  'fragrance-world-proud-of-you-intensely': '/images/perfumes/expanded/fragrance-world-proud-of-you-intensely.jpg',
  'initio-atomic-rose': '/images/perfumes/expanded/initio-atomic-rose.webp',
  'initio-oud-for-greatness': '/images/perfumes/expanded/initio-oud-for-greatness.webp',
  'initio-side-effect': '/images/perfumes/expanded/initio-side-effect.webp',
  'jpg-ultra-male': '/images/perfumes/expanded/jpg-ultra-male.webp',
  'kilian-angels-share': '/images/perfumes/expanded/kilian-angels-share.jpg',
  'kilian-love-dont-be-shy': '/images/perfumes/expanded/kilian-love-dont-be-shy.webp',
  'lattafa-ameer-al-oudh-intense-oud': '/images/perfumes/expanded/lattafa-ameer-al-oudh-intense-oud.png',
  'lattafa-ansaam-gold': '/images/perfumes/expanded/lattafa-ansaam-gold.webp',
  'lattafa-asad': '/images/perfumes/expanded/lattafa-asad.jpg',
  'lattafa-badee-al-oud-amethyst': '/images/perfumes/expanded/lattafa-badee-al-oud-amethyst.webp',
  'lattafa-badee-al-oud-oud-for-glory': '/images/perfumes/expanded/lattafa-badee-al-oud-oud-for-glory.jpg',
  'lattafa-fakhar-black': '/images/perfumes/expanded/lattafa-fakhar-black.jpg',
  'lattafa-nasheet': '/images/perfumes/expanded/lattafa-nasheet.jpg',
  'lattafa-suqraat': '/images/perfumes/expanded/lattafa-suqraat.webp',
  'le-labo-santal-33': '/images/perfumes/expanded/le-labo-santal-33.jpg',
  'louis-vuitton-imagination': '/images/perfumes/expanded/louis-vuitton-imagination.webp',
  'louis-vuitton-l-immensite': '/images/perfumes/expanded/louis-vuitton-l-immensite.webp',
  'louis-vuitton-ombre-nomade': '/images/perfumes/expanded/louis-vuitton-ombre-nomade.jpg',
  'maison-alhambra-amber-and-leather': '/images/perfumes/expanded/maison-alhambra-amber-and-leather.webp',
  'maison-alhambra-bad-femme': '/images/perfumes/expanded/maison-alhambra-bad-femme.png',
  'maison-alhambra-bright-peach': '/images/perfumes/expanded/maison-alhambra-bright-peach.jpg',
  'maison-alhambra-delilah': '/images/perfumes/expanded/maison-alhambra-delilah.jpg',
  'maison-alhambra-fabulo-intense': '/images/perfumes/expanded/maison-alhambra-fabulo-intense.webp',
  'maison-alhambra-hercules': '/images/perfumes/expanded/maison-alhambra-hercules.webp',
  'maison-alhambra-jean-lowe-immortal': '/images/perfumes/expanded/maison-alhambra-jean-lowe-immortal.jpg',
  'maison-alhambra-jean-lowe-ombre': '/images/perfumes/expanded/maison-alhambra-jean-lowe-ombre.jpg',
  'maison-alhambra-kismet-angel': '/images/perfumes/expanded/maison-alhambra-kismet-angel.jpg',
  'maison-alhambra-libbra': '/images/perfumes/expanded/maison-alhambra-libbra.webp',
  'maison-alhambra-lovely-cherie': '/images/perfumes/expanded/maison-alhambra-lovely-cherie.png',
  'maison-alhambra-porto-neroli': '/images/perfumes/expanded/maison-alhambra-porto-neroli.jpg',
  'maison-alhambra-rose-petals': '/images/perfumes/expanded/maison-alhambra-rose-petals.webp',
  'maison-alhambra-tobacco-touch': '/images/perfumes/expanded/maison-alhambra-tobacco-touch.jpg',
  'maison-alhambra-woody-oud': '/images/perfumes/expanded/maison-alhambra-woody-oud.jpg',
  'maison-margiela-by-the-fireplace': '/images/perfumes/expanded/maison-margiela-by-the-fireplace.webp',
  'mfk-baccarat-rouge-540-extrait': '/images/perfumes/expanded/mfk-baccarat-rouge-540-extrait.jpg',
  'mfk-gentle-fluidity-gold': '/images/perfumes/expanded/mfk-gentle-fluidity-gold.webp',
  'nishane-ani': '/images/perfumes/expanded/nishane-ani.jpg',
  'nishane-hacivat': '/images/perfumes/expanded/nishane-hacivat.jpg',
  'paco-rabanne-invictus': '/images/perfumes/expanded/paco-rabanne-invictus.png',
  'paco-rabanne-one-million': '/images/perfumes/expanded/paco-rabanne-one-million.jpg',
  'parfums-de-marly-delina': '/images/perfumes/expanded/parfums-de-marly-delina.webp',
  'parfums-de-marly-herod': '/images/perfumes/expanded/parfums-de-marly-herod.webp',
  'parfums-de-marly-layton': '/images/perfumes/expanded/parfums-de-marly-layton.webp',
  'parfums-de-marly-oriana': '/images/perfumes/expanded/parfums-de-marly-oriana.webp',
  'parfums-de-marly-pegasus': '/images/perfumes/expanded/parfums-de-marly-pegasus.webp',
  'paris-corner-rich-santal': '/images/perfumes/expanded/paris-corner-rich-santal.jpg',
  'paris-corner-vibrant-vetiver-delight': '/images/perfumes/expanded/paris-corner-vibrant-vetiver-delight.webp',
  'paris-corner-voux-elegante': '/images/perfumes/expanded/paris-corner-voux-elegante.webp',
  'prada-l-homme': '/images/perfumes/expanded/prada-l-homme.jpg',
  'rasasi-hawas': '/images/perfumes/expanded/rasasi-hawas.png',
  'rasasi-la-yuqawam': '/images/perfumes/expanded/rasasi-la-yuqawam.webp',
  'tom-ford-bitter-peach': '/images/perfumes/expanded/tom-ford-bitter-peach.jpg',
  'tom-ford-fabulous': '/images/perfumes/expanded/tom-ford-fabulous.webp',
  'tom-ford-lost-cherry': '/images/perfumes/expanded/tom-ford-lost-cherry.jpg',
  'tom-ford-neroli-portofino': '/images/perfumes/expanded/tom-ford-neroli-portofino.jpg',
  'tom-ford-ombre-leather': '/images/perfumes/expanded/tom-ford-ombre-leather.jpg',
  'tom-ford-rose-prick': '/images/perfumes/expanded/tom-ford-rose-prick.webp',
  'tom-ford-tuscan-leather': '/images/perfumes/expanded/tom-ford-tuscan-leather.jpg',
  'viktor-rolf-spicebomb-extreme': '/images/perfumes/expanded/viktor-rolf-spicebomb-extreme.jpg',
  'xerjoff-erba-pura': '/images/perfumes/expanded/xerjoff-erba-pura.jpg',
  'xerjoff-naxos': '/images/perfumes/expanded/xerjoff-naxos.webp',
  'ysl-libre': '/images/perfumes/expanded/ysl-libre.jpg',
  'ysl-y-edp': '/images/perfumes/expanded/ysl-y-edp.jpg'
}

const feedbackById = {
  'lattafa-asad': [
    {
      source: 'reddit',
      author: 'r/DesiFragranceAddicts reviewer',
      text: 'Users describe Asad as strong value for the money, close enough to Sauvage Elixir after the bold opening settles, with a spicy drydown that works best in cooler weather.',
      url: 'https://www.reddit.com/r/DesiFragranceAddicts/comments/1jhtezh/lattafa_asad_review_the_dior_sauvage_elixir_dupe/'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones discussion',
      text: 'Feedback is mixed on performance: some users find it close to Sauvage Elixir with a twist, while others recommend letting the bottle mature before judging projection.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1csov8q/lattafa_asad_honest_review/'
    }
  ],
  'afnan-modest-une': [
    {
      source: 'community',
      author: 'Community consensus',
      text: 'Often recommended as a fresher Sauvage-style option for people who want the blue-fragrance profile at a lower price point.',
      url: 'https://www.fragrantica.com/board/'
    }
  ],
  'lattafa-fakhar-black': [
    {
      source: 'reddit',
      author: 'r/fragranceclones reviewer',
      text: 'Users call Fakhar Black an easy everyday reach that smells good for the price, though several note it does not fully capture the depth of Y EDP.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1hth7ac/lattafa_fakhar_black_review/'
    },
    {
      source: 'reddit',
      author: 'r/DesiFragranceAddicts comparison',
      text: 'Compared with other Y-style clones, users report solid projection for the first couple of hours and better longevity than some similar alternatives.',
      url: 'https://www.reddit.com/r/DesiFragranceAddicts/comments/1fvx0ut/ysl_y_vs_ma_yeah_vs_lattafa_fakhar/'
    }
  ],
  '9pm': [
    {
      source: 'reddit',
      author: 'r/Colognes comparison',
      text: 'Users frequently describe 9PM as very close to Ultra Male, with a sweeter caramel or bubblegum edge and excellent value compared with the designer bottle.',
      url: 'https://www.reddit.com/r/Colognes/comments/16mktqm/ultra_male_va_afnan_9pm/'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones discussion',
      text: 'Some users love the sweet lavender-vanilla profile, while others warn it can lean very sweet and batch performance can vary.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1pvrtth/afnan_9pm_too_sweet_for_a_man/'
    }
  ],
  'armaf-tres-nuit': [
    {
      source: 'community',
      author: 'Clone community feedback',
      text: 'Commonly discussed as an affordable Green Irish Tweed-style fresh green scent, with users usually framing it as easy to wear rather than exactingly luxurious.',
      url: 'https://www.reddit.com/r/fragranceclones/'
    }
  ],
  'armaf-club-de-nuit-sillage': [
    {
      source: 'reddit',
      author: 'r/fragrance reviewer',
      text: 'Reviewers praise Sillage for its airy, musky, citrus-aquatic profile and say it lands very close to Silver Mountain Water while feeling powerful in warm weather.',
      url: 'https://www.reddit.com/r/fragrance/comments/lnhvbt/fragrance_review_3_armaf_club_de_nuit_sillage/'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones comparison',
      text: 'Side-by-side feedback says it can be a little harsher than Creed but often lasts longer and projects more strongly.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/q8nvn5/silver_mountain_water_genuine_vs_clone_armaf_club/'
    }
  ],
  'armaf-club-de-nuit-milestone': [
    {
      source: 'reddit',
      author: 'r/fragranceclones reviewer',
      text: 'Users highlight Milestone as clean, cooling, aquatic, and melon-forward, with a fresh marine profile that makes it easy to recommend for summer.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/13w6dty/club_de_nuit_milestone_review/'
    },
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Community reviews point to strong projection and longevity, often mentioning the orange, cucumber, melon, salty musk feel.',
      url: 'https://www.fragrantica.com/perfume/Armaf/Club-de-Nuit-Milestone-64104.html'
    }
  ],
  'al-haramain-detour-noir': [
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Users generally frame Detour Noir as a very good Layton clone for the price, though some say it is simpler and less evolving than the original.',
      url: 'https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Detour-Noir-70748.html'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones reviewer',
      text: 'Reddit feedback often emphasizes the apple-vanilla opening and warm powdery drydown, with the scent reading cozy rather than fresh.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/15031vq/a_review_of_detour_noir/'
    }
  ],
  'maison-alhambra-kismet-angel': [
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Reviewers often call Kismet Angel one of the better Angels’ Share alternatives, less boozy than the original but still carrying the same warm DNA.',
      url: 'https://www.fragrantica.com/perfume/Maison-Alhambra/Kismet-Angel-79015.html'
    },
    {
      source: 'reddit',
      author: 'r/DesiFragranceAddicts reviewer',
      text: 'Users describe it as more balanced and less loud than Khamrah, with vanilla, amber, and boozy facets plus moderate performance.',
      url: 'https://www.reddit.com/r/DesiFragranceAddicts/comments/1oe1238/quick_review_maison_alhambra_kismet_angel_now/'
    }
  ],
  'maison-alhambra-lovely-cherie': [
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Users describe Lovely Cherie as strongly cherry-forward and very similar to Lost Cherry, though some become nose-blind to it after a couple of hours.',
      url: 'https://www.fragrantica.com/perfume/Maison-Alhambra/Lovely-Cherie-79944.html'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones discussion',
      text: 'Several users call it one of the best Lost Cherry clones they have tried; others note longevity can vary but the scent is recognizable.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/13dr79m/thoughts_on_maison_alhambra_lovely_cherie/'
    }
  ],
  'maison-alhambra-porto-neroli': [
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Users say Porto Neroli captures the Neroli Portofino profile closely, with a bright citrus opening and neroli-heavy drydown, but modest longevity.',
      url: 'https://www.fragrantica.com/perfume/Maison-Alhambra/Porto-Neroli-79939.html'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones discussion',
      text: 'Reddit feedback is split: many enjoy the clean hot-weather scent, while others warn projection and longevity are soft.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1e49p6z/would_you_guys_recommend_porto_neroli/'
    }
  ],
  'maison-alhambra-tobacco-touch': [
    {
      source: 'reddit',
      author: 'r/DesiFragranceAddicts reviewer',
      text: 'Users say Tobacco Touch becomes more appealing on skin after the opening and works as a budget Tobacco Vanille-style scent if you enjoy tobacco notes.',
      url: 'https://www.reddit.com/r/DesiFragranceAddicts/comments/1f4nhvg/maison_alhambra_tobacco_touch_for_the/'
    },
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Fragrantica feedback often mentions cinnamon, tobacco, vanilla sweetness, and strong performance, though some find it spicier than expected.',
      url: 'https://www.fragrantica.com/perfume/Maison-Alhambra/Tobacco-Touch-79943.html'
    }
  ],
  'lattafa-badee-al-oud-oud-for-glory': [
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Users praise Oud for Glory as a strong budget oud that stands on its own while staying close to the Oud for Greatness idea.',
      url: 'https://www.fragrantica.com/perfume/Lattafa-Perfumes/Bade-e-Al-Oud-Oud-for-Glory-64948.html'
    },
    {
      source: 'reddit',
      author: 'r/fragranceclones reviewer',
      text: 'Reddit feedback is more polarized: oud fans call it a good cheap pickup, while others find the profile synthetic or too heavy.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1hruxcs/lattafa_oud_for_glory_review/'
    }
  ],
  'fragrance-world-after-effect': [
    {
      source: 'reddit',
      author: 'r/fragranceclones reviewer',
      text: 'Users often describe After Effect as powerful and close to Side Effect’s boozy-spicy DNA, but stronger and sometimes cloying in heat.',
      url: 'https://www.reddit.com/r/fragranceclones/comments/1cx0ta6/after_effect_by_fa_parisfragrance_worldfrench/'
    },
    {
      source: 'fragrantica',
      author: 'Fragrantica reviewers',
      text: 'Feedback is sharply split: some users love the scent after drydown, while others find cumin, rubbery saffron, or batch variance hard to tolerate.',
      url: 'https://www.fragrantica.com/perfume/French-Avenue/After-Effect-94703.html'
    }
  ],
  'lattafa-badee-al-oud-amethyst': [
    {
      source: 'reddit',
      author: 'r/fragranceclones community',
      text: 'Often recommended for people who want a rose-oud Middle Eastern profile with strong sweetness and a bold, room-filling presence.',
      url: 'https://www.reddit.com/r/fragranceclones/'
    }
  ],
  'armaf-club-de-nuit-untold': [
    {
      source: 'community',
      author: 'Clone community feedback',
      text: 'Frequently recommended as a Baccarat Rouge 540 Extrait-style alternative, especially for people who want the saffron-amber sweetness with stronger value.',
      url: 'https://www.fragrantica.com/perfume/Armaf/'
    }
  ],
  'afnan-supremacy-not-only-intense': [
    {
      source: 'community',
      author: 'Clone community feedback',
      text: 'Users commonly position it between Aventus and Hacivat inspirations, with a dense fruity opening and stronger, darker performance than many fresh clones.',
      url: 'https://www.reddit.com/r/fragranceclones/'
    }
  ],
  'afnan-turathi-blue': [
    {
      source: 'community',
      author: 'Clone community feedback',
      text: 'Often praised as a bright grapefruit-amber style alternative to Tygar, with users highlighting freshness, versatility, and strong value.',
      url: 'https://www.reddit.com/r/fragranceclones/'
    }
  ],
  'rasasi-hawas': [
    {
      source: 'community',
      author: 'Clone community feedback',
      text: 'Users consistently describe Hawas as sweet, aquatic, and very attention-grabbing, with strong performance compared with many fresh designer releases.',
      url: 'https://www.fragrantica.com/perfume/Rasasi/'
    }
  ]
}

const brands = {
  afnan: { _id: 'afnan', name: 'Afnan', origin: 'UAE', type: 'arabian' },
  ajmal: { _id: 'ajmal', name: 'Ajmal', origin: 'UAE', type: 'arabian' },
  alHaramain: { _id: 'al-haramain', name: 'Al Haramain', origin: 'UAE', type: 'arabian' },
  amouage: { _id: 'amouage', name: 'Amouage', origin: 'Oman', type: 'niche' },
  armani: { _id: 'giorgio-armani', name: 'Giorgio Armani', origin: 'Italy', type: 'designer' },
  armaf: { _id: 'armaf', name: 'Armaf', origin: 'UAE', type: 'arabian' },
  bvlgari: { _id: 'bvlgari', name: 'Bvlgari', origin: 'Italy', type: 'designer' },
  byredo: { _id: 'byredo', name: 'Byredo', origin: 'Sweden', type: 'niche' },
  carolinaHerrera: { _id: 'carolina-herrera', name: 'Carolina Herrera', origin: 'USA', type: 'designer' },
  chanel: { _id: 'chanel', name: 'Chanel', origin: 'France', type: 'designer' },
  creed: { _id: 'creed', name: 'Creed', origin: 'UK', type: 'niche' },
  dior: { _id: 'dior', name: 'Dior', origin: 'France', type: 'designer' },
  fragranceWorld: { _id: 'fragrance-world', name: 'Fragrance World', origin: 'UAE', type: 'arabian' },
  givenchy: { _id: 'givenchy', name: 'Givenchy', origin: 'France', type: 'designer' },
  initio: { _id: 'initio', name: 'Initio', origin: 'France', type: 'niche' },
  jeanPaulGaultier: { _id: 'jean-paul-gaultier', name: 'Jean Paul Gaultier', origin: 'France', type: 'designer' },
  kilian: { _id: 'kilian', name: 'Kilian', origin: 'France', type: 'niche' },
  lattafa: { _id: 'lattafa', name: 'Lattafa', origin: 'UAE', type: 'arabian' },
  leLabo: { _id: 'le-labo', name: 'Le Labo', origin: 'USA', type: 'niche' },
  louisVuitton: { _id: 'louis-vuitton', name: 'Louis Vuitton', origin: 'France', type: 'niche' },
  maisonAlhambra: { _id: 'maison-alhambra', name: 'Maison Alhambra', origin: 'UAE', type: 'arabian' },
  maisonFrancisKurkdjian: { _id: 'maison-francis-kurkdjian', name: 'Maison Francis Kurkdjian', origin: 'France', type: 'niche' },
  margiela: { _id: 'maison-margiela', name: 'Maison Margiela', origin: 'France', type: 'designer' },
  nishane: { _id: 'nishane', name: 'Nishane', origin: 'Turkey', type: 'niche' },
  pacoRabanne: { _id: 'paco-rabanne', name: 'Paco Rabanne', origin: 'Spain', type: 'designer' },
  parisCorner: { _id: 'paris-corner', name: 'Paris Corner', origin: 'UAE', type: 'arabian' },
  parfumsDeMarly: { _id: 'parfums-de-marly', name: 'Parfums de Marly', origin: 'France', type: 'niche' },
  prada: { _id: 'prada', name: 'Prada', origin: 'Italy', type: 'designer' },
  rasasi: { _id: 'rasasi', name: 'Rasasi', origin: 'UAE', type: 'arabian' },
  tomFord: { _id: 'tom-ford', name: 'Tom Ford', origin: 'USA', type: 'designer' },
  viktorRolf: { _id: 'viktor-rolf', name: 'Viktor&Rolf', origin: 'Netherlands', type: 'designer' },
  xerjoff: { _id: 'xerjoff', name: 'Xerjoff', origin: 'Italy', type: 'niche' },
  ysl: { _id: 'yves-saint-laurent', name: 'Yves Saint Laurent', origin: 'France', type: 'designer' }
}

const noteProfiles = {
  amber: {
    top: [note('Bergamot', 'citrus'), note('Saffron', 'spicy')],
    middle: [note('Amber', 'oriental'), note('Jasmine', 'floral')],
    base: [note('Vanilla', 'gourmand'), note('Musk', 'animalic')]
  },
  aromatic: {
    top: [note('Bergamot', 'citrus'), note('Lavender', 'fresh')],
    middle: [note('Sage', 'fresh'), note('Geranium', 'floral')],
    base: [note('Cedar', 'woody'), note('Ambergris', 'animalic')]
  },
  citrus: {
    top: [note('Bergamot', 'citrus'), note('Grapefruit', 'citrus')],
    middle: [note('Ginger', 'spicy'), note('Marine Notes', 'fresh')],
    base: [note('Musk', 'animalic'), note('Cedar', 'woody')]
  },
  floral: {
    top: [note('Bergamot', 'citrus'), note('Peony', 'floral')],
    middle: [note('Rose', 'floral'), note('Jasmine', 'floral')],
    base: [note('Vanilla', 'gourmand'), note('Musk', 'animalic')]
  },
  fresh: {
    top: [note('Lemon', 'citrus'), note('Bergamot', 'citrus')],
    middle: [note('Lavender', 'fresh'), note('Green Notes', 'fresh')],
    base: [note('Musk', 'animalic'), note('Sandalwood', 'woody')]
  },
  gourmand: {
    top: [note('Cinnamon', 'spicy'), note('Apple', 'fresh')],
    middle: [note('Vanilla', 'gourmand'), note('Praline', 'gourmand')],
    base: [note('Tonka', 'gourmand'), note('Amber', 'oriental')]
  },
  leather: {
    top: [note('Saffron', 'spicy'), note('Raspberry', 'gourmand')],
    middle: [note('Leather', 'animalic'), note('Jasmine', 'floral')],
    base: [note('Amber', 'oriental'), note('Woods', 'woody')]
  },
  oud: {
    top: [note('Saffron', 'spicy'), note('Nutmeg', 'spicy')],
    middle: [note('Oud', 'woody'), note('Rose', 'floral')],
    base: [note('Patchouli', 'woody'), note('Musk', 'animalic')]
  },
  spicy: {
    top: [note('Cardamom', 'spicy'), note('Pepper', 'spicy')],
    middle: [note('Lavender', 'fresh'), note('Cinnamon', 'spicy')],
    base: [note('Amber', 'oriental'), note('Tonka', 'gourmand')]
  },
  woody: {
    top: [note('Bergamot', 'citrus'), note('Cardamom', 'spicy')],
    middle: [note('Sandalwood', 'woody'), note('Cedar', 'woody')],
    base: [note('Amber', 'oriental'), note('Musk', 'animalic')]
  }
}

const perfume = ({
  id,
  name,
  brand,
  type,
  category,
  gender = 'unisex',
  priceRange,
  concentration = 'EDP',
  longevity,
  sillage,
  description
}) => ({
  _id: id,
  name,
  brand,
  type,
  category,
  gender,
  priceRange,
  concentration,
  longevity,
  sillage,
  imageUrl: productImages[id] || '',
  description,
  notes: noteProfiles[category] || noteProfiles.amber,
  reviews: feedbackById[id] || []
})

const original = (id, name, brand, category, gender = 'unisex') => perfume({
  id,
  name,
  brand,
  type: brand.type,
  category,
  gender,
  priceRange: 'luxury',
  longevity: 8,
  sillage: 8,
  description: `${name} is a popular ${brand.type} fragrance frequently searched as an original reference for Middle Eastern alternatives.`
})

const alternative = (id, name, brand, category, gender = 'unisex') => perfume({
  id,
  name,
  brand,
  type: 'arabian',
  category,
  gender,
  priceRange: 'budget',
  longevity: 8,
  sillage: 8,
  description: `${name} is a Middle Eastern alternative inspired by a well-known designer or niche scent profile.`
})

const clone = (id, name, brand, category, gender = 'unisex') => ({
  ...alternative(id, name, brand, category, gender),
  type: 'clone'
})

export const expandedPerfumes = [
  original('dior-sauvage-elixir', 'Sauvage Elixir', brands.dior, 'spicy', 'masculine'),
  alternative('lattafa-asad', 'Asad', brands.lattafa, 'spicy', 'masculine'),
  alternative('afnan-modest-une', 'Modest Une', brands.afnan, 'fresh', 'masculine'),
  original('ysl-y-edp', 'Y Eau de Parfum', brands.ysl, 'aromatic', 'masculine'),
  alternative('lattafa-fakhar-black', 'Fakhar Black', brands.lattafa, 'aromatic', 'masculine'),
  original('jpg-ultra-male', 'Ultra Male', brands.jeanPaulGaultier, 'gourmand', 'masculine'),
  original('creed-green-irish-tweed', 'Green Irish Tweed', brands.creed, 'fresh', 'masculine'),
  clone('armaf-tres-nuit', 'Tres Nuit', brands.armaf, 'fresh', 'masculine'),
  original('creed-silver-mountain-water', 'Silver Mountain Water', brands.creed, 'fresh', 'unisex'),
  clone('armaf-club-de-nuit-sillage', 'Club de Nuit Sillage', brands.armaf, 'fresh', 'unisex'),
  original('creed-millesime-imperial', 'Millesime Imperial', brands.creed, 'citrus', 'unisex'),
  clone('armaf-club-de-nuit-milestone', 'Club de Nuit Milestone', brands.armaf, 'citrus', 'unisex'),
  original('parfums-de-marly-layton', 'Layton', brands.parfumsDeMarly, 'spicy', 'masculine'),
  alternative('al-haramain-detour-noir', 'Detour Noir', brands.alHaramain, 'spicy', 'masculine'),
  original('parfums-de-marly-pegasus', 'Pegasus', brands.parfumsDeMarly, 'gourmand', 'masculine'),
  clone('armaf-craze', 'Craze', brands.armaf, 'gourmand', 'masculine'),
  original('parfums-de-marly-herod', 'Herod', brands.parfumsDeMarly, 'gourmand', 'masculine'),
  alternative('maison-alhambra-hercules', 'Hercules', brands.maisonAlhambra, 'gourmand', 'masculine'),
  original('parfums-de-marly-delina', 'Delina', brands.parfumsDeMarly, 'floral', 'feminine'),
  alternative('maison-alhambra-delilah', 'Delilah', brands.maisonAlhambra, 'floral', 'feminine'),
  original('parfums-de-marly-oriana', 'Oriana', brands.parfumsDeMarly, 'gourmand', 'feminine'),
  alternative('lattafa-ansaam-gold', 'Ansaam Gold', brands.lattafa, 'gourmand', 'feminine'),
  original('kilian-angels-share', "Angels' Share", brands.kilian, 'gourmand', 'unisex'),
  alternative('maison-alhambra-kismet-angel', 'Kismet Angel', brands.maisonAlhambra, 'gourmand', 'unisex'),
  original('kilian-love-dont-be-shy', "Love Don't Be Shy", brands.kilian, 'gourmand', 'feminine'),
  original('tom-ford-lost-cherry', 'Lost Cherry', brands.tomFord, 'gourmand', 'unisex'),
  alternative('maison-alhambra-lovely-cherie', 'Lovely Cherie', brands.maisonAlhambra, 'gourmand', 'unisex'),
  original('tom-ford-bitter-peach', 'Bitter Peach', brands.tomFord, 'gourmand', 'unisex'),
  alternative('maison-alhambra-bright-peach', 'Bright Peach', brands.maisonAlhambra, 'gourmand', 'unisex'),
  original('tom-ford-fabulous', 'Fabulous', brands.tomFord, 'leather', 'unisex'),
  alternative('maison-alhambra-fabulo-intense', 'Fabulo Intense', brands.maisonAlhambra, 'leather', 'unisex'),
  original('tom-ford-ombre-leather', 'Ombre Leather', brands.tomFord, 'leather', 'unisex'),
  alternative('maison-alhambra-amber-and-leather', 'Amber & Leather', brands.maisonAlhambra, 'leather', 'unisex'),
  alternative('maison-alhambra-tobacco-touch', 'Tobacco Touch', brands.maisonAlhambra, 'gourmand', 'unisex'),
  original('tom-ford-tuscan-leather', 'Tuscan Leather', brands.tomFord, 'leather', 'unisex'),
  alternative('rasasi-la-yuqawam', 'La Yuqawam', brands.rasasi, 'leather', 'masculine'),
  original('tom-ford-neroli-portofino', 'Neroli Portofino', brands.tomFord, 'citrus', 'unisex'),
  alternative('maison-alhambra-porto-neroli', 'Porto Neroli', brands.maisonAlhambra, 'citrus', 'unisex'),
  original('tom-ford-rose-prick', 'Rose Prick', brands.tomFord, 'floral', 'unisex'),
  alternative('maison-alhambra-rose-petals', 'Rose Petals', brands.maisonAlhambra, 'floral', 'unisex'),
  alternative('maison-alhambra-woody-oud', 'Woody Oud', brands.maisonAlhambra, 'oud', 'unisex'),
  original('louis-vuitton-ombre-nomade', 'Ombre Nomade', brands.louisVuitton, 'oud', 'unisex'),
  alternative('maison-alhambra-jean-lowe-ombre', 'Jean Lowe Ombre', brands.maisonAlhambra, 'oud', 'unisex'),
  original('louis-vuitton-l-immensite', "L'Immensite", brands.louisVuitton, 'citrus', 'masculine'),
  alternative('maison-alhambra-jean-lowe-immortal', 'Jean Lowe Immortal', brands.maisonAlhambra, 'citrus', 'masculine'),
  original('louis-vuitton-imagination', 'Imagination', brands.louisVuitton, 'citrus', 'masculine'),
  alternative('fragrance-world-essence-de-blanc', 'Essence de Blanc', brands.fragranceWorld, 'citrus', 'masculine'),
  original('xerjoff-erba-pura', 'Erba Pura', brands.xerjoff, 'fresh', 'unisex'),
  alternative('al-haramain-amber-oud-gold-edition', 'Amber Oud Gold Edition', brands.alHaramain, 'fresh', 'unisex'),
  original('xerjoff-naxos', 'Naxos', brands.xerjoff, 'gourmand', 'unisex'),
  alternative('paris-corner-voux-elegante', 'Voux Elegante', brands.parisCorner, 'gourmand', 'unisex'),
  original('initio-oud-for-greatness', 'Oud for Greatness', brands.initio, 'oud', 'unisex'),
  alternative('lattafa-badee-al-oud-oud-for-glory', "Bade'e Al Oud Oud for Glory", brands.lattafa, 'oud', 'unisex'),
  original('initio-side-effect', 'Side Effect', brands.initio, 'gourmand', 'unisex'),
  alternative('fragrance-world-after-effect', 'After Effect', brands.fragranceWorld, 'gourmand', 'unisex'),
  original('initio-atomic-rose', 'Atomic Rose', brands.initio, 'floral', 'unisex'),
  alternative('lattafa-badee-al-oud-amethyst', "Bade'e Al Oud Amethyst", brands.lattafa, 'floral', 'unisex'),
  original('mfk-gentle-fluidity-gold', 'Gentle Fluidity Gold', brands.maisonFrancisKurkdjian, 'amber', 'unisex'),
  alternative('fragrance-world-barakkat-gentle-gold', 'Barakkat Gentle Gold', brands.fragranceWorld, 'amber', 'unisex'),
  original('mfk-baccarat-rouge-540-extrait', 'Baccarat Rouge 540 Extrait', brands.maisonFrancisKurkdjian, 'amber', 'unisex'),
  alternative('armaf-club-de-nuit-untold', 'Club de Nuit Untold', brands.armaf, 'amber', 'unisex'),
  original('byredo-bal-d-afrique', "Bal d'Afrique", brands.byredo, 'woody', 'unisex'),
  alternative('paris-corner-vibrant-vetiver-delight', 'Vibrant Vetiver Delight', brands.parisCorner, 'woody', 'unisex'),
  original('le-labo-santal-33', 'Santal 33', brands.leLabo, 'woody', 'unisex'),
  alternative('paris-corner-rich-santal', 'Rich Santal', brands.parisCorner, 'woody', 'unisex'),
  original('nishane-hacivat', 'Hacivat', brands.nishane, 'citrus', 'unisex'),
  alternative('afnan-supremacy-not-only-intense', 'Supremacy Not Only Intense', brands.afnan, 'citrus', 'masculine'),
  original('nishane-ani', 'Ani', brands.nishane, 'gourmand', 'unisex'),
  alternative('lattafa-nasheet', 'Nasheet', brands.lattafa, 'gourmand', 'unisex'),
  original('amouage-reflection-man', 'Reflection Man', brands.amouage, 'floral', 'masculine'),
  clone('armaf-legesi', 'Legesi', brands.armaf, 'floral', 'masculine'),
  original('bvlgari-tygar', 'Tygar', brands.bvlgari, 'citrus', 'masculine'),
  alternative('afnan-turathi-blue', 'Turathi Blue', brands.afnan, 'citrus', 'masculine'),
  original('chanel-coco-mademoiselle', 'Coco Mademoiselle', brands.chanel, 'floral', 'feminine'),
  clone('armaf-club-de-nuit-woman', 'Club de Nuit Woman', brands.armaf, 'floral', 'feminine'),
  original('armani-acqua-di-gio-profumo', 'Acqua di Gio Profumo', brands.armani, 'fresh', 'masculine'),
  alternative('lattafa-suqraat', 'Suqraat', brands.lattafa, 'fresh', 'masculine'),
  original('armani-stronger-with-you-intensely', 'Stronger With You Intensely', brands.armani, 'gourmand', 'masculine'),
  alternative('fragrance-world-proud-of-you-intensely', 'Proud of You Intensely', brands.fragranceWorld, 'gourmand', 'masculine'),
  original('prada-l-homme', "L'Homme", brands.prada, 'woody', 'masculine'),
  alternative('ajmal-evoke-gold-for-him', 'Evoke Gold for Him', brands.ajmal, 'woody', 'masculine'),
  original('carolina-herrera-good-girl', 'Good Girl', brands.carolinaHerrera, 'gourmand', 'feminine'),
  alternative('maison-alhambra-bad-femme', 'B.A.D. Femme', brands.maisonAlhambra, 'gourmand', 'feminine'),
  original('ysl-libre', 'Libre', brands.ysl, 'floral', 'feminine'),
  alternative('maison-alhambra-libbra', 'Libbra', brands.maisonAlhambra, 'floral', 'feminine'),
  original('viktor-rolf-spicebomb-extreme', 'Spicebomb Extreme', brands.viktorRolf, 'spicy', 'masculine'),
  alternative('fragrance-world-eau-de-spice-extreme', 'Eau de Spice Extreme', brands.fragranceWorld, 'spicy', 'masculine'),
  original('dior-homme-original', 'Dior Homme Original', brands.dior, 'woody', 'masculine'),
  clone('armaf-futura-la-homme', 'Futura La Homme', brands.armaf, 'woody', 'masculine'),
  original('maison-margiela-by-the-fireplace', 'By the Fireplace', brands.margiela, 'gourmand', 'unisex'),
  alternative('lattafa-ameer-al-oudh-intense-oud', 'Ameer Al Oudh Intense Oud', brands.lattafa, 'gourmand', 'unisex'),
  original('chanel-bleu-de-chanel', 'Bleu de Chanel', brands.chanel, 'aromatic', 'masculine'),
  clone('armaf-club-de-nuit-blue-iconic', 'Club de Nuit Blue Iconic', brands.armaf, 'aromatic', 'masculine'),
  original('paco-rabanne-invictus', 'Invictus', brands.pacoRabanne, 'fresh', 'masculine'),
  alternative('rasasi-hawas', 'Hawas', brands.rasasi, 'fresh', 'masculine'),
  original('paco-rabanne-one-million', '1 Million', brands.pacoRabanne, 'spicy', 'masculine'),
  clone('armaf-club-de-nuit-man', 'Club de Nuit Man', brands.armaf, 'spicy', 'masculine')
]

export const expandedDupeRelations = [
  { _id: 'dupe-sauvage-elixir-asad', originalId: 'dior-sauvage-elixir', dupeId: 'lattafa-asad', similarityScore: 86, priceComparison: { savings: 88 } },
  { _id: 'dupe-ysl-y-fakhar-black', originalId: 'ysl-y-edp', dupeId: 'lattafa-fakhar-black', similarityScore: 84, priceComparison: { savings: 82 } },
  { _id: 'dupe-ultra-male-9pm', originalId: 'jpg-ultra-male', dupeId: '9pm', similarityScore: 86, priceComparison: { savings: 83 } },
  { _id: 'dupe-green-irish-tweed-tres-nuit', originalId: 'creed-green-irish-tweed', dupeId: 'armaf-tres-nuit', similarityScore: 82, priceComparison: { savings: 93 } },
  { _id: 'dupe-silver-mountain-water-cdn-sillage', originalId: 'creed-silver-mountain-water', dupeId: 'armaf-club-de-nuit-sillage', similarityScore: 86, priceComparison: { savings: 91 } },
  { _id: 'dupe-millesime-imperial-milestone', originalId: 'creed-millesime-imperial', dupeId: 'armaf-club-de-nuit-milestone', similarityScore: 85, priceComparison: { savings: 91 } },
  { _id: 'dupe-layton-detour-noir', originalId: 'parfums-de-marly-layton', dupeId: 'al-haramain-detour-noir', similarityScore: 88, priceComparison: { savings: 89 } },
  { _id: 'dupe-pegasus-craze', originalId: 'parfums-de-marly-pegasus', dupeId: 'armaf-craze', similarityScore: 84, priceComparison: { savings: 88 } },
  { _id: 'dupe-herod-hercules', originalId: 'parfums-de-marly-herod', dupeId: 'maison-alhambra-hercules', similarityScore: 82, priceComparison: { savings: 88 } },
  { _id: 'dupe-delina-delilah', originalId: 'parfums-de-marly-delina', dupeId: 'maison-alhambra-delilah', similarityScore: 84, priceComparison: { savings: 88 } },
  { _id: 'dupe-oriana-ansaam-gold', originalId: 'parfums-de-marly-oriana', dupeId: 'lattafa-ansaam-gold', similarityScore: 82, priceComparison: { savings: 86 } },
  { _id: 'dupe-angels-share-kismet-angel', originalId: 'kilian-angels-share', dupeId: 'maison-alhambra-kismet-angel', similarityScore: 87, priceComparison: { savings: 86 } },
  { _id: 'dupe-love-dont-be-shy-ansaam-gold', originalId: 'kilian-love-dont-be-shy', dupeId: 'lattafa-ansaam-gold', similarityScore: 80, priceComparison: { savings: 86 } },
  { _id: 'dupe-lost-cherry-lovely-cherie', originalId: 'tom-ford-lost-cherry', dupeId: 'maison-alhambra-lovely-cherie', similarityScore: 86, priceComparison: { savings: 85 } },
  { _id: 'dupe-bitter-peach-bright-peach', originalId: 'tom-ford-bitter-peach', dupeId: 'maison-alhambra-bright-peach', similarityScore: 83, priceComparison: { savings: 85 } },
  { _id: 'dupe-fabulous-fabulo-intense', originalId: 'tom-ford-fabulous', dupeId: 'maison-alhambra-fabulo-intense', similarityScore: 84, priceComparison: { savings: 86 } },
  { _id: 'dupe-ombre-leather-amber-and-leather', originalId: 'tom-ford-ombre-leather', dupeId: 'maison-alhambra-amber-and-leather', similarityScore: 86, priceComparison: { savings: 84 } },
  { _id: 'dupe-tobacco-vanille-tobacco-touch', originalId: 'tobacco-vanille', dupeId: 'maison-alhambra-tobacco-touch', similarityScore: 84, priceComparison: { savings: 84 } },
  { _id: 'dupe-tuscan-leather-la-yuqawam', originalId: 'tom-ford-tuscan-leather', dupeId: 'rasasi-la-yuqawam', similarityScore: 90, priceComparison: { savings: 84 } },
  { _id: 'dupe-neroli-portofino-porto-neroli', originalId: 'tom-ford-neroli-portofino', dupeId: 'maison-alhambra-porto-neroli', similarityScore: 83, priceComparison: { savings: 85 } },
  { _id: 'dupe-rose-prick-rose-petals', originalId: 'tom-ford-rose-prick', dupeId: 'maison-alhambra-rose-petals', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-oud-wood-woody-oud', originalId: 'oud-wood', dupeId: 'maison-alhambra-woody-oud', similarityScore: 86, priceComparison: { savings: 84 } },
  { _id: 'dupe-ombre-nomade-jean-lowe-ombre', originalId: 'louis-vuitton-ombre-nomade', dupeId: 'maison-alhambra-jean-lowe-ombre', similarityScore: 85, priceComparison: { savings: 88 } },
  { _id: 'dupe-l-immensite-jean-lowe-immortal', originalId: 'louis-vuitton-l-immensite', dupeId: 'maison-alhambra-jean-lowe-immortal', similarityScore: 84, priceComparison: { savings: 88 } },
  { _id: 'dupe-imagination-essence-de-blanc', originalId: 'louis-vuitton-imagination', dupeId: 'fragrance-world-essence-de-blanc', similarityScore: 82, priceComparison: { savings: 88 } },
  { _id: 'dupe-erba-pura-amber-oud-gold', originalId: 'xerjoff-erba-pura', dupeId: 'al-haramain-amber-oud-gold-edition', similarityScore: 86, priceComparison: { savings: 78 } },
  { _id: 'dupe-naxos-voux-elegante', originalId: 'xerjoff-naxos', dupeId: 'paris-corner-voux-elegante', similarityScore: 80, priceComparison: { savings: 88 } },
  { _id: 'dupe-oud-for-greatness-oud-for-glory', originalId: 'initio-oud-for-greatness', dupeId: 'lattafa-badee-al-oud-oud-for-glory', similarityScore: 88, priceComparison: { savings: 89 } },
  { _id: 'dupe-side-effect-after-effect', originalId: 'initio-side-effect', dupeId: 'fragrance-world-after-effect', similarityScore: 84, priceComparison: { savings: 88 } },
  { _id: 'dupe-atomic-rose-amethyst', originalId: 'initio-atomic-rose', dupeId: 'lattafa-badee-al-oud-amethyst', similarityScore: 82, priceComparison: { savings: 88 } },
  { _id: 'dupe-gentle-fluidity-gold-barakkat-gentle-gold', originalId: 'mfk-gentle-fluidity-gold', dupeId: 'fragrance-world-barakkat-gentle-gold', similarityScore: 84, priceComparison: { savings: 88 } },
  { _id: 'dupe-br540-extrait-untold', originalId: 'mfk-baccarat-rouge-540-extrait', dupeId: 'armaf-club-de-nuit-untold', similarityScore: 86, priceComparison: { savings: 88 } },
  { _id: 'dupe-bal-d-afrique-vibrant-vetiver', originalId: 'byredo-bal-d-afrique', dupeId: 'paris-corner-vibrant-vetiver-delight', similarityScore: 80, priceComparison: { savings: 82 } },
  { _id: 'dupe-santal-33-rich-santal', originalId: 'le-labo-santal-33', dupeId: 'paris-corner-rich-santal', similarityScore: 80, priceComparison: { savings: 84 } },
  { _id: 'dupe-hacivat-supremacy-not-only-intense', originalId: 'nishane-hacivat', dupeId: 'afnan-supremacy-not-only-intense', similarityScore: 84, priceComparison: { savings: 82 } },
  { _id: 'dupe-ani-nasheet', originalId: 'nishane-ani', dupeId: 'lattafa-nasheet', similarityScore: 83, priceComparison: { savings: 86 } },
  { _id: 'dupe-reflection-man-legesi', originalId: 'amouage-reflection-man', dupeId: 'armaf-legesi', similarityScore: 82, priceComparison: { savings: 90 } },
  { _id: 'dupe-tygar-turathi-blue', originalId: 'bvlgari-tygar', dupeId: 'afnan-turathi-blue', similarityScore: 84, priceComparison: { savings: 82 } },
  { _id: 'dupe-coco-mademoiselle-cdn-woman', originalId: 'chanel-coco-mademoiselle', dupeId: 'armaf-club-de-nuit-woman', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-acqua-di-gio-profumo-suqraat', originalId: 'armani-acqua-di-gio-profumo', dupeId: 'lattafa-suqraat', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-stronger-with-you-proud-of-you', originalId: 'armani-stronger-with-you-intensely', dupeId: 'fragrance-world-proud-of-you-intensely', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-prada-l-homme-evoke-gold', originalId: 'prada-l-homme', dupeId: 'ajmal-evoke-gold-for-him', similarityScore: 83, priceComparison: { savings: 78 } },
  { _id: 'dupe-good-girl-bad-femme', originalId: 'carolina-herrera-good-girl', dupeId: 'maison-alhambra-bad-femme', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-libre-libbra', originalId: 'ysl-libre', dupeId: 'maison-alhambra-libbra', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-spicebomb-extreme-eau-de-spice', originalId: 'viktor-rolf-spicebomb-extreme', dupeId: 'fragrance-world-eau-de-spice-extreme', similarityScore: 84, priceComparison: { savings: 84 } },
  { _id: 'dupe-dior-homme-original-futura', originalId: 'dior-homme-original', dupeId: 'armaf-futura-la-homme', similarityScore: 82, priceComparison: { savings: 83 } },
  { _id: 'dupe-by-the-fireplace-ameer-al-oudh', originalId: 'maison-margiela-by-the-fireplace', dupeId: 'lattafa-ameer-al-oudh-intense-oud', similarityScore: 80, priceComparison: { savings: 84 } },
  { _id: 'dupe-bleu-de-chanel-blue-iconic', originalId: 'chanel-bleu-de-chanel', dupeId: 'armaf-club-de-nuit-blue-iconic', similarityScore: 82, priceComparison: { savings: 84 } },
  { _id: 'dupe-invictus-hawas', originalId: 'paco-rabanne-invictus', dupeId: 'rasasi-hawas', similarityScore: 82, priceComparison: { savings: 78 } },
  { _id: 'dupe-one-million-cdn-man', originalId: 'paco-rabanne-one-million', dupeId: 'armaf-club-de-nuit-man', similarityScore: 80, priceComparison: { savings: 84 } }
]
