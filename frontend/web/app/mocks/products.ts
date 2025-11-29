import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Boneco Personalizado - Urso",
    description: "Ursinho de crochê feito à mão com fio 100% algodão, ideal para bebês.",
    longDescription: "Este adorável urso de crochê é a companhia perfeita para o seu pequeno. Confeccionado artesanalmente com a técnica amigurumi, cada detalhe é pensado para garantir a segurança e o conforto do bebê. Os olhos possuem trava de segurança e o enchimento é de fibra siliconada antialérgica. Pode ser personalizado com as cores de sua preferência para combinar com a decoração do quarto.",
    price: 120.00,
    image: "/bonecoCroche.svg",
    images: [
      "/bonecoCroche.svg",
      "/bonecaCroche.svg", 
      "/bonecoCroche.svg",
      "/bonecaCroche.svg"
    ],
    category: "Bonecos",
    dimensions: "30cm de altura x 15cm de largura",
    material: "Fio 100% algodão mercerizado, enchimento antialérgico, olhos com trava de segurança"
  },
  {
    id: 2,
    name: "Tapete Redondo - Sala",
    description: "Tapete exclusivo em barbante cru, perfeito para decorar sua sala de estar.",
    longDescription: "Transforme sua sala com este elegante tapete redondo em crochê. Feito com barbante de alta qualidade, ele traz um toque rústico e acolhedor ao ambiente. Seu design intrincado em mandala é um verdadeiro destaque visual. Ideal para salas de estar, quartos ou cantinhos de leitura. Fácil de lavar e muito durável.",
    price: 250.00,
    image: "/tapeteCroche.svg",
    images: [
      "/tapeteCroche.svg",
      "/tapeteCroche.svg",
      "/tapeteCroche.svg"
    ],
    category: "Tapetes",
    dimensions: "1,20m de diâmetro",
    material: "Barbante 85% algodão e 15% outras fibras (fio número 6)"
  },
  {
    id: 3,
    name: "Bolsa de Praia",
    description: "Bolsa espaçosa e resistente, estilo boho chic para o verão.",
    longDescription: "Arrase no verão com esta bolsa de praia estilo boho chic. Espaçosa o suficiente para levar toalha, protetor solar, livro e muito mais. Confeccionada em fio náutico, é resistente à água e areia, além de ser super leve. Possui alças reforçadas para maior conforto ao carregar.",
    price: 180.00,
    image: "/bolsaCroche.svg",
    images: [
      "/bolsaCroche.svg",
      "/bolsaCroche.svg",
      "/bolsaCroche.svg"
    ],
    category: "Acessórios",
    dimensions: "40cm largura x 35cm altura x 10cm profundidade",
    material: "Fio náutico (polipropileno), alças em material sintético ou crochê"
  },
  {
    id: 4,
    name: "Kit Bebê - Polvo",
    description: "Polvo terapêutico para recém-nascidos, feito com material hipoalergênico.",
    longDescription: "O polvo de crochê é conhecido por acalmar recém-nascidos, pois seus tentáculos remetem ao cordão umbilical, trazendo segurança e conforto. Este kit é feito seguindo rigorosos padrões de segurança, com fio 100% algodão e enchimento antialérgico lavável.",
    price: 85.00,
    image: "/bonecoCroche.svg",
    images: [
      "/bonecoCroche.svg",
      "/bonecaCroche.svg"
    ],
    category: "Bonecos",
    dimensions: "Cabeça: 8cm, Tentáculos: 22cm (esticados)",
    material: "Fio 100% algodão, fibra siliconada antialérgica"
  },
  {
    id: 5,
    name: "Cesto Organizador",
    description: "Cesto rígido em fio de malha, ótimo para organizar brinquedos ou revistas.",
    longDescription: "Organização com estilo! Este cesto em fio de malha é estruturado e perfeito para guardar brinquedos, revistas, mantas ou até mesmo usar como cachepô para plantas. Disponível em diversas cores para combinar com sua decoração.",
    price: 60.00,
    image: "/tapeteCroche.svg",
    images: [
      "/tapeteCroche.svg",
      "/tapeteCroche.svg"
    ],
    category: "Decoração",
    dimensions: "30cm diâmetro x 25cm altura",
    material: "Fio de malha residual (ecológico)"
  },
  {
    id: 6,
    name: "Sousplat - Jogo de 4",
    description: "Jogo americano de crochê para deixar sua mesa posta ainda mais elegante.",
    longDescription: "Surpreenda seus convidados com uma mesa posta impecável. Este jogo de sousplat protege sua mesa e adiciona um toque de sofisticação a qualquer refeição. Feito com fio de alta qualidade que não desbota na lavagem.",
    price: 100.00,
    image: "/bolsaCroche.svg",
    images: [
      "/bolsaCroche.svg",
      "/tapeteCroche.svg"
    ],
    category: "Mesa e Banho",
    dimensions: "38cm de diâmetro",
    material: "Fio 100% algodão"
  }
];
