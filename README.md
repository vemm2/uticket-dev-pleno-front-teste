# 🎟️ EventHub - Teste Técnico Front-end Pleno (Uticket)

Bem-vindo ao repositório do **EventHub**, o projeto desenvolvido como teste técnico para a vaga de Desenvolvedor(a) Front-end Pleno na [Uticket](https://uticket.com.br/).

O sistema consiste em um gerenciamento e busca de eventos, migrado e atualizado para utilizar o App Router do Next.js 14+ em conjunto com a API Oficial da Ticketmaster.

---

## 📋 Sumário
- [Sobre a Aplicação](#-sobre-a-aplicação)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Como Buildar e Testar](#-como-buildar-e-testar)
- [Decisões Técnicas e Arquitetura](#-decisões-técnicas-e-arquitetura)
  - [1. Estrutura de Pastas](#1-estrutura-de-pastas)
  - [2. Correção de Layout](#2-correção-de-layout)
  - [3. Estudo de Rotas e Renderização](#3-estudo-de-rotas-e-renderização)

---

## 💻 Sobre a Aplicação

Este projeto consome a **API da Ticketmaster** para exibir eventos em destaque, possibilitar a busca avançada por atrações, apresentar detalhes de um evento específico e permitir que o usuário salve seus favoritos.
O desafio original pode ser encontrado em: [🔗 Link do Desafio](https://github.com/uticket/test-frontend).

---

## 🚀 Como Rodar o Projeto

Para executar a aplicação no seu ambiente local, siga os passos abaixo:

1. **Clone este repositório**
```bash
git clone https://github.com/vemm2/uticket-dev-pleno-front-teste.git
```

2. **Instale as dependências**
Na raiz do projeto, instale os pacotes:
```bash
npm install
```

3. **Configure as Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do seu projeto contendo as seguintes credenciais:
```env
TICKETMASTER_API_KEY=sua_chave_aqui
TICKETMASTER_BASE_URL=https://app.ticketmaster.com/discovery/v2
```
*(Nota: O uso da `TICKETMASTER_BASE_URL` hardcoded desta maneira na env facilita o teste do projeto, visto que a BASE_URL é pública e não contém informações sensíveis).*

4. **Inicie o servidor local:**
```bash
npm run dev
```
A aplicação estará rodando em [http://localhost:3000](http://localhost:3000).

---

## 📦 Como Buildar e Testar

Para testar o build localmente antes de um possível deploy:
```bash
npm run build 
```
Após o processo concluir, inicie a versão de produção com:
```bash
npm run start
```

---

## 🏗️ Decisões Técnicas e Arquitetura

O projeto foi organizado buscando facilitar a manutenção, ter um código limpo e aplicar os recursos do Next.js.

### 1. Estrutura de Pastas
Optei por padronizar a estrutura separando os arquivos de acordo com o tipo:
- `app/`: Aplicação em si (páginas principais e rotas do Next.js).
- `components/`: Componentes globais e compartilhados da aplicação.
- `constants/`: Informações estáticas ou mockadas.
- `hooks/`: Hooks personalizados.
- `services/`: Comunicação com a API (server actions).
- `store/`: Gerenciamento do estado global utilizando **Zustand**.
- `types/`: Tipos e interfaces do TypeScript.
- `utils/`: Funções e utilidades compartilhadas pelo app.

### 2. Correção de Layout
Havia um problema de navegação no layout que gerava erro ao tentar voltar para a `Home` usando as abas. Isso foi resolvido trocando a navegação antiga via React para utilizar o componente `<Link />` do Next.js.

### 3. Estudo de Rotas e Renderização

Busquei aplicar a estratégia de renderização mais adequada para cada necessidade das páginas:

#### `Home Page (/)`
* **Estratégia:** Incremental Static Regeneration (ISR) com atualização a cada 1 hora.
* **Componentização:** A tela é renderizada via ISR (servidor), mas o componente `<EventCard />` é um Client Component. Fiz isso para permitir a interatividade (como os botões locais de salvar).
* **Bugs - Preço dos eventos:** Como a API da Ticketmaster muitas vezes não retorna o preço para a maioria dos eventos, eles acabam ficando listados como gratuitos. Em um cenário real de longo prazo, seria mais interessante colocar algo como "Preço Indisponível".
* **Bugs - Favoritos:** Ao favoritar um evento, o estado se perdia se a página fosse recarregada. Corrigi isso utilizando a funcionalidade `persist` do Zustand para manter a informação no LocalStorage.

#### `Página de Buscar Eventos (/buscar)`
* **Estratégia:** Server-Side Rendering (SSR). Como os resultados variam dependendo dos parâmetros buscados, a renderização fica no servidor. O `<EventCard />` segue sendo Client Component.
* **Bugs - Filtros:** Os filtros de busca originais não estavam funcionando e foram consertados. 
* *(Observação sobre o filtro de pago/gratuito: Este filtro específico foi retirado. Como a API oficial da Ticketmaster não oferece um parâmetro para filtrar por preço direto na requisição, teríamos que baixar os dados primeiro e então filtrar no TypeScript. Isso causaria erros visuais na paginação da busca, podendo levar o usuário para uma página 1 vazia e uma página 2 com alguns resultados. Preferi retirar o filtro visando manter a usabilidade).*

#### `Tela de Meus Eventos (/salvos)`
* **Estratégia:** Client Component (CSR).
* Como essa tela não tem apelo tão importante para o SEO e possui as interações de navegação resgatando informações exclusivas do navegador do usuário, optei por fazê-la totalmente como Client Component.

#### `Tela de Evento (/evento/[id])`
* **Estratégia:** Static Site Generation (SSG). Utilizei a função `generateStaticParams` para pré-renderizar no build as páginas dos IDs dos shows mais populares.
* Implementei otimização de SEO com a Metadata API do Next.js para carregar as tags daquele evento específico.
* O código original dessa tela estava muito extenso, então quebrei em componentes menores para ajudar em futuras manutenções e leitura de código.
