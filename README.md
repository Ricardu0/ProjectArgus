# 🎓 Argus — Sistema Educacional com Inteligência Artificial

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?logo=spring)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql)
![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)

O **Argus** é uma plataforma educacional inovadora que combina **React** no frontend, **Spring Boot** no backend e **MySQL** como banco de dados. O sistema oferece autenticação segura com **JWT**, uma área administrativa para gerenciamento de conteúdo e integração com um **chatbot educacional** baseado em inteligência artificial.

---

## 📑 Visão Geral

O Argus é projetado para facilitar o aprendizado e a administração de conteúdos educacionais. Suas principais funcionalidades incluem:

- **Autenticação segura**: Login e registro com tokens JWT.
- **Área administrativa**: Gerenciamento de conteúdos, materias, temas, e subtemas..
- **Chatbot educacional**: Integração com IA para suporte interativo ao aprendizado.
- **Arquitetura modular**: Frontend e backend bem estruturados para escalabilidade.

---

## 📌 Pendências do Projeto

- [ ] Ajustar rotas do frontend e backend para maior consistência.
- [ ] Implementar proteção de rotas no frontend e backend com redirecionamento automático para `/adm`.
- [ ] Refatorar models e controllers no backend (relacionamentos, DTOs, endpoints GET por ID).
- [ ] Aplicar princípios SOLID no frontend para reduzir acoplamento e melhorar reutilização.
- [ ] Otimizar queries SQL e normalizar a estrutura do banco de dados.

---

## ⚙️ Frontend

### 📋 Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- IDE recomendada: [WebStorm](https://www.jetbrains.com/webstorm/) ou [VS Code](https://code.visualstudio.com/)
- Porta 3000 disponível
## 🚀 Instalação

### 1. Clonar o Repositório
Clone o repositório do projeto para sua máquina local:
bash
```
git clone https://github.com/seu-usuario/argusdef.git
cd argusdef
```

### 2. Configurar o Banco de Dados
1. Inicie o MySQL e crie o banco de dados:
```
sql
CREATE DATABASE seu_banco;
```

2. Configure as credenciais do banco no arquivo `application.properties` do backend:
```
properties
src/main/resources/application.properties
```
Exemplo:
```
properties
spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

### 3. Configurar o Backend
1. Navegue até o diretório do backend:
```bash
cd backend
```
2. Instale as dependências do Maven:
```bash
./mvnw install
```

3. Inicie o servidor Spring Boot:
```bash
./mvnw spring-boot:run
```
4. Verifique se o CORS está configurado para permitir a origem do frontend (`http://localhost:3000`).
   ### i IMPORTANTE: Se voce estiver usando o intelij, poupara o tempo de configurar, entao recomendo. 

### 4. Configurar o Frontend
1. Navegue até o diretório do frontend:
```bash
cd frontend
```
2. Instale as dependências do Node.js:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

⚠️ **Nota**: Caso ocorra um erro inicial do Webpack, ignore-o. Certifique-se de que a porta 3000 está livre.

### 5. Configurar o Chatbot Educacional
O sistema inclui um chatbot baseado na API do **OpenRouter** (modelo `deepseek-r1-distill-llama-70b:free`). Para configurá-lo:

1. Acesse o arquivo:
```javascript
frontend/src/view/components/aibot
```
3. Na linha 5, insira sua chave de API:
```javascript
const API_KEY = "sua-chave-aqui";
```
4. Obtenha a chave no [OpenRouter](https://openrouter.ai/).

---

## 🔍 Verificação
Após a configuração, acesse as seguintes URLs no navegador:
- **Registro**: `http://localhost:3000/register`
- **Login**: `http://localhost:3000/login`
- **Administração**: `http://localhost:3000/adm`

O backend estará disponível em `http://localhost:8080` (padrão do Spring Boot).

---

## ⚠️ Solução de Problemas

- **Erro de porta ocupada**: Verifique se as portas 3000 (frontend) e 8080 (backend) estão livres. Use `lsof -i :3000` ou `lsof -i :8080` para identificar e encerrar processos.
- **Erro de conexão com o banco**: Confirme que o MySQL está ativo e que as credenciais em `application.properties` estão corretas.
- **Erro do Webpack**: Ignore erros iniciais do Webpack ou reinicie o servidor com `npm start`.

---
