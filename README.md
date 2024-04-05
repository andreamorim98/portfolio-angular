# Portfolio Angular - FrontEnd

##Instalação / Subida:
- Utilizar a versão do node: v12.22.12
- Executar o comando no terminal: `npm install`


##Swagger
###Gerando o swagger manualmente
- Subir o backend do portfolio localmente
- Baixar o [JSON](http://localhost:8080/portfolio/api/swagger.json) do swagger do back-end
- Entrar no [editor.swagger.io](https://editor.swagger.io/)
  - Importar o JSON baixado no site
  - No menu superior: Generate client -> Typescript-angular
  - Após o download extraia e substitua os arquivos que estão na pasta: **src/app/services/swagger**

###Gerando arquivos do swagger novo via script (Linux):
- Executar o comando no terminal: `npm run gerar-swagger-linux`
- Passo a passo feito pelo script:
  - Excluir os arquivos do swagger atuais
  - Gerar novos arquivos pelo swagger-codegen-cli.jar
  - Salvar os novos arquivos gerados no mesmo diretório
