
import { useState } from "react";
import {
  Menu,
  X,
  Code2,
  Smartphone,
  Bot,
  Globe,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Layers,
  Zap,
  MessageCircle,
} from "lucide-react";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      icon: <Globe />,
      title: "Desenvolvimento de Sites",
      description:
        "Sites modernos, rápidos e profissionais para destacar sua empresa na internet.",
    },
    {
      icon: <Smartphone />,
      title: "Aplicativos",
      description:
        "Aplicativos intuitivos e soluções digitais para conectar empresas e clientes.",
    },
    {
      icon: <Bot />,
      title: "Automações Inteligentes",
      description:
        "Automatize processos, economize tempo e aumente a produtividade do seu negócio.",
    },
    {
      icon: <Code2 />,
      title: "Sistemas Personalizados",
      description:
        "Sistemas desenvolvidos para resolver problemas reais e facilitar operações.",
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-wrapper">
      <header className="header">
        <a href="#inicio" className="logo" onClick={closeMenu}>
          BARUK<span>TECH</span>
          <div className="logo-dot" />
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav active" : "nav"}>
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#projetos" onClick={closeMenu}>Projetos</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#contato" className="nav-contact" onClick={closeMenu}>
            Fale conosco <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={15} />
              TECNOLOGIA • INOVAÇÃO • RESULTADOS
            </div>

            <h1>
              Transformamos
              <br />
              ideias em
              <br />
              <span>soluções digitais.</span>
            </h1>

            <p>
              Criamos sites, aplicativos, sistemas e automações
              inteligentes para empresas que desejam crescer
              e conquistar o futuro.
            </p>

            <div className="hero-buttons">
              <a href="#contato" className="btn-primary">
                Vamos conversar <ArrowUpRight size={18} />
              </a>

              <a href="#servicos" className="btn-secondary">
                Conheça nossos serviços
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>01</strong>
                <span>Inovação</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Tecnologia</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Resultados</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />

            <div className="visual-card">
              <div className="visual-top">
                <span className="status-dot" />
                BARUKTECH SYSTEM
                <span className="visual-version">01.0</span>
              </div>

              <div className="visual-icon">
                <Layers size={65} strokeWidth={1.2} />
              </div>

              <h3>O futuro é digital.</h3>
              <p>Construindo possibilidades através da tecnologia.</p>

              <div className="visual-bottom">
                <span><Zap size={15} /> INOVAÇÃO ATIVA</span>
                <span>BT_2026</span>
              </div>
            </div>

            <div className="floating-tag tag-one">
              <Code2 size={17} /> Desenvolvimento
            </div>

            <div className="floating-tag tag-two">
              <Bot size={17} /> Inteligência artificial
            </div>
          </div>
        </section>

        <section className="services section" id="servicos">
          <div className="section-heading">
            <span className="section-label">O QUE FAZEMOS</span>
            <h2>
              Tecnologia que
              <br />
              <span>impulsiona negócios.</span>
            </h2>
            <p>
              Soluções digitais pensadas para transformar
              desafios em oportunidades.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-number">
                  0{index + 1}
                </div>

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <a href="#contato" className="service-link">
                  Saiba mais <ChevronRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section" id="projetos">
          <div className="section-heading">
            <span className="section-label">NOSSO TRABALHO</span>
            <h2>
              Ideias que ganham
              <br />
              <span>vida através da tecnologia.</span>
            </h2>
          </div>

          <div className="project-placeholder">
            <Layers size={42} />
            <h3>Nosso portfólio está em construção.</h3>
            <p>
              Em breve, você poderá conhecer projetos,
              sistemas e soluções desenvolvidas pela BARUKTECH.
            </p>
          </div>
        </section>

        <section className="about section" id="sobre">
          <div>
            <span className="section-label">QUEM SOMOS</span>
            <h2>
              Mais que tecnologia.
              <br />
              <span>Uma nova forma de criar.</span>
            </h2>
          </div>

          <p>
            A BARUKTECH nasce com o propósito de aproximar
            empresas da inovação. Desenvolvemos soluções
            digitais que unem criatividade, estratégia e
            tecnologia para construir resultados reais.
          </p>
        </section>

        <section className="contact section" id="contato">
          <div className="contact-content">
            <span className="section-label">VAMOS CONSTRUIR JUNTOS?</span>
            <h2>
              Sua próxima grande
              <br />
              ideia começa <span>aqui.</span>
            </h2>
            <p>
              Conte-nos seu projeto e descubra o que podemos
              desenvolver juntos.
            </p>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} />
              Fale pelo WhatsApp
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#inicio" className="logo">
          BARUK<span>TECH</span>
        </a>
        <p>© 2026 BARUKTECH. Tecnologia e inovação.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </div>
  );
}

export default App;
