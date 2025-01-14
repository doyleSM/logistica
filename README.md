## Entendimento do Problema

Primeiramente, fiz o mapeamento das linhas da tabela para o seguinte modelo:

### Customer

- id
- name

### Order

- id
- date
- customer
- orderItems

### OrderItem

- order_id
- value
- product_id

## Desenvolvimento da Solução

A aplicação recebe a requisição POST com o arquivo enviado, faz upload para o S3 e publica uma mensagem na fila do RabbitMQ passando informações sobre o arquivo. A aplicação conta com um consumidor que, ao receber o evento informando um novo arquivo, utiliza streams para iniciar o processamento. Para fins de performance, a aplicação faz inserções em batch.

### Por que dessa Solução

Se a aplicação esperasse toda a leitura e inserção no banco de dados, com arquivos muito grandes poderíamos deixar o usuário travado por muito tempo esperando a requisição.
Com o fluxo assíncrono de persistência, podemos fazer um reprocessamento no caso de algum problema.
 O uso de streams permite que lidemos com arquivos grandes sem carregar tudo na memória; conforme vai lendo os chunks, vai inserindo.

## Sobre a Aplicação

O framework utilizado para o backend foi o NestJS, por facilitar diversas configurações, como ter containers de injeção de dependência embutidos, biblioteca de swagger de fácil integração, além de diversas outras bibliotecas com grande compatibilidade e claro, tecnologia que já possuo conhecimento.

A parte do Domain e da Application segue os conceitos de arquitetura limpa, sendo totalmente isolada e podendo ser facilmente convertida para outro framework ou utilizar outras tecnologias. A solução entregue está utilizando **PostgreSQL** como banco de dados, **TypeORM** como ORM, **RabbitMQ** para mensageria e **LocalStack** para S3. No entanto, como a aplicação foi desenvolvida utilizando os conceitos do SOLID, podemos facilmente utilizar outras tecnologias, desde que implementem as interfaces definidas.

A aplicação conta com testes unitários cobrindo 100% do Domain e da Application. É possível fazer testes de integração, até tem os testes e2e desenvolvidos, mas para automatizar a infraestrutura precisaria de um pouco mais de tempo. Ainda é possível rodá-los, falo mais sobre isso abaixo.

## Consulta de dados

Para facilitar a consulta e os agrupamentos conforme o solicitado, foi criada uma view no banco de dados PostgreSQL. Essa view agrega as informações necessárias de forma otimizada, permitindo que os dados sejam acessados de forma mais eficiente sem a necessidade de realizar múltiplas junções em consultas complexas. A view foi projetada para atender às necessidades do sistema, oferecendo uma estrutura simplificada para as consultas frequentes e garantindo que a aplicação se mantenha performática ao lidar com grandes volumes de dados.

Dessa forma, qualquer consulta que exija agrupamento ou agregação de dados pode ser feita de forma direta e eficiente através da view, sem impactar significativamente o desempenho da aplicação.

## Como Compilar e Rodar a Aplicação e os Testes via Docker

### Pré-requisitos

- Docker
- Docker Compose

### Passos para Compilar e Rodar a Aplicação

1. Construa a imagem Docker:

```sh
docker compose build
```

2. Inicie os containers:

```sh
docker compose up
```

A aplicação estará disponível em `http://localhost:3000`.
Swagger em `http://localhost:3000/swagger`

### Rodando os Testes

Para rodar os testes unitários e de integração, utilize o seguinte comando:

```sh
docker compose run nestjs-app npm run test:cov
```

### Parando os Containers

Para parar e remover os containers, utilize o comando:

```sh
docker-compose down
```

Adicionei um video de exemplo mostrando a aplicação sendo executada rapidamente