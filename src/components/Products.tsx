import { useState } from "react";
import { ArrowRight, Bike, Briefcase, Car, Heart, Home, Key, PawPrint, Plane, PiggyBank } from "lucide-react";
import { ProductModal, type ProductDetail } from "./ProductModal";

const products: ProductDetail[] = [
  {
    id: "Seguro Auto e Moto",
    title: "Seguro Auto e Moto",
    icon: Car,
    tagline: "Mobilidade protegida em qualquer trajeto.",
    what: "Proteção completa para seu carro ou moto contra imprevistos do dia a dia, com assistência 24h e cobertura sob medida para o seu perfil.",
    daily: [
      "Roubo, furto e colisão cobertos",
      "Carro reserva e guincho 24h",
      "Vidros, faróis e retrovisores",
      "Proteção contra terceiros",
    ],
    diferenciais: [
      "Comparação entre as principais seguradoras",
      "Consultoria que entende seu uso real do veículo",
      "Acompanhamento em sinistros e renovações",
      "Atendimento humano, sem call center",
    ],
    benefit: "Como colaborador AirSupply, você tem atendimento prioritário, condições diferenciadas e o benefício também é extensivo aos veículos da família.",
    ideal: ["Quem usa o carro diariamente", "Famílias com mais de um veículo", "Motociclistas urbanos", "Motoristas de aplicativo"],
  },
  {
    id: "Seguro Vida",
    title: "Seguro Vida",
    icon: Heart,
    tagline: "Cuidar de quem você ama, mesmo no inesperado.",
    what: "Uma proteção financeira que ampara sua família em momentos difíceis, garantindo tranquilidade e continuidade do padrão de vida.",
    daily: [
      "Indenização rápida em caso de imprevisto",
      "Cobertura para invalidez e doenças graves",
      "Assistência funeral familiar",
      "Diárias por internação hospitalar",
    ],
    diferenciais: [
      "Análise consultiva do perfil familiar",
      "Comparativo entre seguradoras top do mercado",
      "Sem burocracia na contratação",
      "Acompanhamento humano em todo o processo",
    ],
    benefit: "Condições diferenciadas para colaboradores AirSupply com extensão da proteção para cônjuge, filhos e pais.",
    ideal: ["Quem tem filhos", "Provedores da família", "Quem busca segurança patrimonial", "Quem quer planejar o futuro"],
  },
  {
    id: "Seguro Residencial",
    title: "Seguro Residencial",
    icon: Home,
    tagline: "Sua casa protegida contra o imprevisto.",
    what: "Proteção contra incêndio, roubo, danos elétricos, vendaval e muitos outros eventos — com assistência residencial completa.",
    daily: [
      "Chaveiro, eletricista e encanador 24h",
      "Cobertura para roubo e furto qualificado",
      "Danos elétricos em eletrodomésticos",
      "Reparos rápidos em emergências",
    ],
    diferenciais: [
      "Cobertura sob medida para casa ou apartamento",
      "Consultoria para identificar coberturas essenciais",
      "Atendimento humano em sinistros",
      "Renovação automática facilitada",
    ],
    benefit: "Atendimento prioritário e condições exclusivas para colaboradores AirSupply proteger o lar e a família.",
    ideal: ["Famílias", "Quem mora sozinho", "Proprietários e inquilinos", "Quem viaja com frequência"],
  },
  {
    id: "Previdência",
    title: "Previdência Privada",
    icon: PiggyBank,
    tagline: "Construa o futuro que você merece.",
    what: "Um plano de longo prazo que ajuda a acumular patrimônio para a aposentadoria, educação dos filhos ou grandes projetos de vida.",
    daily: [
      "Poupança mensal flexível",
      "Benefícios fiscais no Imposto de Renda",
      "Sucessão patrimonial simplificada",
      "Aplicação automática e disciplinada",
    ],
    diferenciais: [
      "Análise consultiva do seu objetivo financeiro",
      "Acompanhamento de rentabilidade",
      "Sugestão dos melhores fundos para o seu perfil",
      "Suporte humano durante toda a jornada",
    ],
    benefit: "Consultoria especializada exclusiva para colaboradores AirSupply planejarem o futuro com tranquilidade.",
    ideal: ["Quem pensa em aposentadoria", "Pais que querem educar os filhos", "Quem quer disciplina financeira", "Famílias que planejam sucessão"],
  },
  {
    id: "Consórcio",
    title: "Consórcio",
    icon: Briefcase,
    tagline: "Realize sonhos sem juros e com parcelas que cabem.",
    what: "Uma forma inteligente de adquirir carro, moto ou imóvel pagando parcelas menores e sem os juros de um financiamento tradicional.",
    daily: [
      "Parcelas mais leves que financiamento",
      "Sem juros — apenas taxa administrativa",
      "Possibilidade de lance e contemplação antecipada",
      "Planejamento financeiro disciplinado",
    ],
    diferenciais: [
      "Comparação entre as melhores administradoras",
      "Consultoria para escolher o plano ideal",
      "Suporte estratégico para lances",
      "Acompanhamento até a contemplação",
    ],
    benefit: "Acesso prioritário a planos selecionados e consultoria dedicada para colaboradores AirSupply conquistarem mais.",
    ideal: ["Quem quer trocar de carro", "Quem sonha com a casa própria", "Quem busca o primeiro imóvel", "Famílias em planejamento"],
  },
  {
    id: "Seguro Viagem",
    title: "Seguro Viagem",
    icon: Plane,
    tagline: "Aproveite a viagem sem pensar no que pode dar errado.",
    what: "Cobertura nacional e internacional para emergências médicas, bagagem, cancelamentos e assistência durante toda a viagem.",
    daily: [
      "Atendimento médico no exterior",
      "Indenização por bagagem extraviada",
      "Cancelamento e remarcação cobertos",
      "Assistência 24h em qualquer país",
    ],
    diferenciais: [
      "Sugestão da melhor cobertura por destino",
      "Apólice emitida com agilidade",
      "Suporte humano em emergências",
      "Comparação entre seguradoras",
    ],
    benefit: "Condições diferenciadas para colaboradores AirSupply e proteção para viagens em família.",
    ideal: ["Quem viaja a trabalho", "Famílias em férias", "Mochileiros e intercambistas", "Cruzeiristas"],
  },
  {
    id: "Equipamentos",
    title: "Seguro de Equipamentos",
    icon: Bike,
    tagline: "Celular, notebook, bike e games protegidos onde você for.",
    what: "Proteção contra roubo, furto, queda e danos acidentais nos equipamentos que fazem parte do seu dia.",
    daily: [
      "Cobertura para celular e notebook",
      "Bikes elétricas e tradicionais",
      "Consoles, câmeras e drones",
      "Reparo ou reposição rápida",
    ],
    diferenciais: [
      "Contratação 100% digital",
      "Consultoria para escolher a cobertura ideal",
      "Suporte humano em sinistros",
      "Comparação entre seguradoras",
    ],
    benefit: "Vantagens exclusivas para colaboradores AirSupply protegerem ferramentas de trabalho e lazer.",
    ideal: ["Profissionais que usam notebook", "Ciclistas urbanos", "Gamers", "Criadores de conteúdo"],
  },
  {
    id: "Seguro Fiança",
    title: "Seguro Fiança",
    icon: Key,
    tagline: "Alugue seu imóvel sem fiador e sem dor de cabeça.",
    what: "Substitui o fiador e o depósito caução no aluguel, deixando o processo de locação muito mais simples e rápido.",
    daily: [
      "Sem precisar pedir a parentes ou amigos",
      "Aprovação rápida para o imóvel desejado",
      "Aceito pelas principais imobiliárias",
      "Contrato digital descomplicado",
    ],
    diferenciais: [
      "Análise rápida do perfil do locatário",
      "Acompanhamento durante toda a locação",
      "Atendimento humano e consultivo",
      "Suporte na renovação contratual",
    ],
    benefit: "Atendimento prioritário e condições facilitadas para colaboradores AirSupply conquistarem o lar ideal.",
    ideal: ["Quem está mudando de cidade", "Jovens em primeira locação", "Quem não quer comprometer poupança", "Famílias em transição"],
  },
  {
    id: "Plano PET",
    title: "Plano PET",
    icon: PawPrint,
    tagline: "Cuide de quem também é da família.",
    what: "Cobertura veterinária para consultas, exames, cirurgias e emergências, com rede credenciada e atendimento humanizado.",
    daily: [
      "Consultas e vacinas no preventivo",
      "Exames e cirurgias cobertos",
      "Emergências 24h",
      "Rede credenciada de qualidade",
    ],
    diferenciais: [
      "Planos para cães e gatos de todas as idades",
      "Consultoria para escolher a melhor cobertura",
      "Atendimento humano em qualquer dúvida",
      "Sem burocracia na contratação",
    ],
    benefit: "Condições diferenciadas para colaboradores AirSupply cuidarem dos pets da família com tranquilidade.",
    ideal: ["Tutores de cães e gatos", "Famílias com vários pets", "Pets idosos", "Quem quer cuidar do preventivo"],
  },
];

export function Products() {
  const [active, setActive] = useState<ProductDetail | null>(null);

  return (
    <section id="produtos" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Experiência consultiva</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy">
            Soluções de proteção para cada momento da sua vida
          </h2>
          <p className="mt-4 text-muted-foreground">
            Toque em qualquer produto para entender como ele se encaixa na sua rotina — sem termos técnicos, com exemplos reais.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="group relative text-left rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-brand-orange/40 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-4 focus:ring-brand-orange/20"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-sky/5 group-hover:bg-brand-sky/15 transition-colors" />
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-navy flex items-center justify-center shadow-soft mb-5 group-hover:scale-105 transition-transform">
                  <p.icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange group-hover:gap-2.5 transition-all">
                  Conhecer benefício
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProductModal product={active} open={!!active} onClose={() => setActive(null)} />
    </section>
  );
}
