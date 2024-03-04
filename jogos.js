const jogos = [
  {
    id: 1,
    nome: "Resident Evil 4 Remeke",
    descricao: "Resident Evil 4 retorna com uma experiência reimaginada para os fãs e uma nova geração de jogadores. Reviva a icônica jornada de Leon S. Kennedy enquanto ele se aventura em uma Europa rural infestada por uma ameaça desconhecida. Com gráficos deslumbrantes e uma jogabilidade renovada, mergulhe em um mundo sombrio e claustrofóbico, onde cada passo pode ser sua última esperança ou sua perdição. Enfrente inimigos remasterizados, explore áreas expandidas e descubra segredos nunca antes revelados. Prepare-se para reviver o terror de Resident Evil 4 como nunca antes visto, enquanto desvenda os mistérios por trás dos segredos de Los Illuminados.",
    preco: 9.99,
    foto: require('./assets/jogos/re4.png')
  },
  {
    id: 2,
    nome: "Marvel's Spider-Man 2",
    descricao: "Marvel's Spider-Man 2 traz de volta o icônico herói, Peter Parker, para enfrentar seu mais desafiador capítulo até agora. Com a chegada do simbionte, uma força alienígena sedenta de poder, e a ameaça iminente de Kraven, o lendário caçador, Nova York se encontra à beira do caos. Nesta emocionante sequência, os jogadores mergulharão em uma narrativa envolvente, enquanto acompanham Peter em sua jornada para enfrentar os seus próprios demônios internos, enquanto luta para proteger a cidade que jurou defender. Com gráficos de última geração e uma jogabilidade aprimorada, os jogadores podem esperar uma experiência visualmente deslumbrante e repleta de ação, enquanto exploram a vasta e dinâmica cidade de Nova York. Prepare-se para balançar pelos arranha-céus, enfrentar desafios épicos e desvendar segredos sombrios enquanto o destino de Nova York e de Peter Parker estão em suas mãos.",
    preco: 99.99,
    foto: require('./assets/jogos/spiderman2.jpg')
  },
  {
    id: 3,
    nome: "Red Dead Redemption 2",
    descricao: "Red Dead Redemption 2 leva os jogadores de volta ao Velho Oeste em uma jornada épica de sobrevivência, honra e redenção. Ambientado em um vasto e imersivo mundo aberto, o jogo segue Arthur Morgan, um fora da lei e membro da gangue Van der Linde, enquanto ele luta para manter sua própria moralidade em meio ao declínio do Oeste americano.Com gráficos deslumbrantes e uma atenção meticulosa aos detalhes, os jogadores são transportados para uma era de pistoleiros e fronteiras indomáveis. Explore paisagens pitorescas, de montanhas cobertas de neve a pântanos enevoados, enquanto embarca em missões emocionantes e encontros inesperados. Além da narrativa principal, Red Dead Redemption 2 oferece uma ampla gama de atividades, desde caçar animais selvagens até jogar pôquer em saloons. Com uma trilha sonora arrebatadora e personagens memoráveis, esta é uma aventura que vai cativar os jogadores do início ao fim, deixando uma marca duradoura na história dos videogames.",
    preco: 999.99,
    foto: require('./assets/jogos/reddead2.jpg')
  },
  {
    id: 4,
    nome: "God of War: Ragnarok",
    descricao: "God of War: Ragnarok mergulha os jogadores em uma nova e emocionante jornada ao lado de Kratos e seu filho, Atreus, em uma épica batalha contra os deuses nórdicos e o fim do mundo conhecido como Ragnarok. Embarque em uma aventura intensa e repleta de ação, enquanto Kratos e Atreus viajam pelos Nove Reinos em busca de poderosas entidades e aliados para enfrentar o inevitável apocalipse. Com gráficos impressionantes e uma jogabilidade aprimorada, os jogadores podem esperar combates épicos, quebra-cabeças desafiadores e momentos emocionantes que testarão os limites do herói de guerra mais temido dos videogames. Além disso, mergulhe na rica mitologia nórdica, descobrindo segredos antigos e confrontando deuses implacáveis enquanto Kratos e Atreus lutam para proteger o que resta da humanidade. Com uma narrativa envolvente e personagens cativantes, God of War: Ragnarok promete uma experiência inesquecível que elevará os padrões do gênero de ação e aventura.",
    preco: 9999.99,
    foto: require('./assets/jogos/god_r.jpg')
  },
  {
    id: 5,
    nome: "Cyberpunk 2077",
    descricao: "Cyberpunk 2077 é um jogo de RPG de ação de mundo aberto ambientado em Night City, uma megalópole obcecada pelo poder, glamour e modificações corporais. Você joga como V, um mercenário fora da lei atrás de um implante único que é a chave da imortalidade. Você pode personalizar aparatos cibernéticos, conjunto de habilidades e estilo de jogo do personagem e explorar uma vasta cidade onde as escolhas tomadas moldam a história e o mundo ao seu redor.",
    preco: 59.99,
    foto: require('./assets/jogos/cyberpunk2077.jpg')
  },
  {
    id: 6,
    nome: "Assassin's Creed Valhalla",
    descricao: "Assassin's Creed Valhalla é um RPG de ação ambientado na era dos vikings. Você joga como Eivor, um guerreiro viking que lidera seu clã da gelada Noruega para um novo lar na rica terra dos reinos divididos da Inglaterra do século IX. Explore um mundo aberto vibrante e dinâmico, construa alianças políticas, lidere invasões épicas contra fortalezas e forje seu próprio caminho para a glória viking.",
    preco: 49.99,
    foto: require('./assets/jogos/assassinscreedvalhalla.jpg')
  },
  {
    id: 7,
    nome: "Final Fantasy VII Remake",
    descricao: "Final Fantasy VII Remake é uma recriação do clássico jogo de RPG japonês de 1997. Reviva a épica aventura de Cloud Strife e seu grupo de ecoterroristas enquanto lutam contra a mega-corporação Shinra em uma batalha pela salvação do planeta. Com combates dinâmicos em tempo real e gráficos deslumbrantes, esta é uma reimaginação emocionante de uma das histórias mais amadas dos videogames.",
    preco: 69.99,
    foto: require('./assets/jogos/finalfantasyviiremake.jpg')
  },
  {
    id: 8,
    nome: "The Legend of Zelda: Breath of the Wild",
    descricao: "The Legend of Zelda: Breath of the Wild é um jogo de aventura e exploração que redefine os padrões da série Zelda. Explore um vasto mundo aberto, enfrente desafios em masmorras e santuários, e descubra a verdade por trás do cataclismo que devastou o reino de Hyrule. Com uma jogabilidade inovadora e uma narrativa envolvente, este é um dos jogos mais aclamados de todos os tempos.",
    preco: 59.99,
    foto: require('./assets/jogos/thelegendofzeldabreathofthewild.jpg')
  },
  {
    id: 9,
    nome: "Death Stranding",
    descricao: "Death Stranding é um jogo de aventura em mundo aberto ambientado em um futuro pós-apocalíptico. Você joga como Sam Bridges, um entregador encarregado de reconectar uma sociedade fragmentada por uma misteriosa catástrofe. Navegue por paisagens desoladas, construa pontes e alianças e descubra o que realmente aconteceu com o mundo. Com uma narrativa complexa e visualmente deslumbrante, Death Stranding é uma experiência única e inesquecível.",
    preco: 39.99,
    foto: require('./assets/jogos/deathstranding.jpg')
  },
  {
    id: 10,
    nome: "Horizon Forbidden West",
    descricao: "Horizon Forbidden West é uma sequência do aclamado Horizon Zero Dawn, um jogo de ação e aventura em mundo aberto ambientado em um futuro distópico onde a humanidade luta para sobreviver contra criaturas robóticas monstruosas. Embarque em uma jornada épica com a caçadora Aloy enquanto ela explora terras devastadas e descobre segredos há muito perdidos. Com combates emocionantes e uma narrativa envolvente, Horizon Forbidden West promete levar os jogadores a novos e emocionantes lugares.",
    preco: 69.99,
    foto: require('./assets/jogos/horizonforbiddenwest.jpg')
  },
  {
    id: 11,
    nome: "Ghost of Tsushima",
    descricao: "Ghost of Tsushima é um jogo de ação e aventura ambientado no Japão feudal durante a invasão mongol de 1274. Você joga como Jin Sakai, um samurai que deve abandonar suas tradições para se tornar um fantasma e lutar pela liberdade de Tsushima. Explore um mundo aberto vasto e deslumbrante, lute em combates intensos com a katana e descubra o código do samurai em uma jornada épica pela honra e vingança.",
    preco: 49.99,
    foto: require('./assets/jogos/ghostoftsushima.jpg')
  },
  {
    id: 12,
    nome: "Demon's Souls",
    descricao: "Demon's Souls é um jogo de RPG de ação que definiu o gênero de soulsborne . Ambientado em um mundo sombrio e sinistro, você joga como um herói destinado a derrotar os demônios que assolam a terra de Boletaria. Com uma jogabilidade desafiadora, uma atmosfera imersiva e gráficos de tirar o fôlego, Demon's Souls é uma experiência obrigatória para os fãs de jogos difíceis e recompensadores.",
    preco: 69.99,
    foto: require('./assets/jogos/demonssouls.jpg')
  },
  {
    id: 13,
    nome: "Hogwarts Legacy",
    descricao: "Em Hogwarts Legacy, os jogadores são transportados para o mágico mundo de Harry Potter em uma época anterior à saga do famoso bruxo. Ambientado em um vasto e encantador universo, os jogadores assumem o papel de um aluno recém-chegado à Escola de Magia e Bruxaria de Hogwarts. Explorando os corredores misteriosos do castelo, os alunos desvendam segredos antigos, enfrentam desafios mágicos e embarcam em aventuras emocionantes enquanto descobrem seu próprio destino na comunidade mágica. Com gráficos deslumbrantes e uma jogabilidade envolvente, Hogwarts Legacy oferece aos jogadores a oportunidade de mergulhar profundamente na rica mitologia de Harry Potter, interagindo com personagens icônicos, criaturas fantásticas e explorando locais familiares de uma perspectiva totalmente nova. Além das aulas de feitiçaria e bruxaria, os jogadores enfrentam ameaças sombrias que se escondem nos cantos mais escuros de Hogwarts, testando sua coragem e habilidades mágicas em uma luta contra as forças das trevas. Prepare-se para uma jornada mágica e inesquecível em Hogwarts Legacy, onde cada escolha molda o destino do mundo mágico.",
    preco: 99999.99,
    foto: require('./assets/jogos/hog_leg.jpg')
  },
  {
    id: 14,
    nome: "Palword",
    descricao: "Palworld é um jogo em que você pode tanto levar uma vida tranquila junto de criaturas fantásticas conhecidas como “Pals” quanto envolver-se em confrontos arriscados contra caçadores clandestinos. Os Pals podem ser usados em batalhas, para procriação ou até como ajudantes de trabalho em fazendas e fábricas. Você também pode vendê-los ou transformá-los em comida. Escassez de comida, ambientes inóspitos, caçadores ilegais… O mundo está repleto de desafios e você precisa fazer de tudo para sobreviver. Às vezes, talvez precise até usar os Pals como alimento… Se você montar em certos Pals, poderá explorar todos os tipos de lugar, seja na terra, no mar ou nos ares.",
    preco: 0.00,
    foto: require('./assets/jogos/palword.jpg')
  },
];

export default jogos;
