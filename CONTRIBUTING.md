## Must know
Before any step futher, read this guidelines: https://github.com/github/docs/blob/main/CONTRIBUTING.md


### Tools

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Sequelize](http://sequelize.org/master/manual/getting-started.html)
-

### Concepts

- [Solid](https://www.google.com/search?q=programing+solid&oq=programing+solid&aqs=chrome..69i57j0l9.2516j0j4&sourceid=chrome&ie=UTF-8)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clode Code](https://www.google.com/search?q=clean+code&oq=clean+code&aqs=chrome..69i57j46i67i433j35i39j0i67j0j46j69i60l2.1509j0j4&sourceid=chrome&ie=UTF-8)

## Getting started

- Crie uma nova conta no [Gitlab](https://gitlab.com/)
- [Crie um chave ssh](https://www.google.com/search?q=create+ssh+key&oq=create+ssh&aqs=chrome.2.69i57j69i59j0l8.3744j0j4&sourceid=chrome&ie=UTF-8) na sua máquina. Note que a criação pode variar de acordo com o sistema operacional.
- [Adicione sua chave pública no Gitlab](https://dev.to/sndrx/how-to-set-up-an-ssh-key-and-use-it-in-gitlab--42p1).
- Leia o README. 

## Using Git and GitFlow 
- Uma vez que você tenha uma issue criada, mova-a para a lista "Doing", selecione a milestone, insira a data de conclusão e crei um novo branch começando com feature/, refactor/ ou fix/ e seguido do nome do próprio issue;
- Planeje a tarefa definindo o passo a passo que deverá ser feito e tudo o que precisará para começar;
- Uma vez que tiver planejado, crie um primeiro arquivo e dê um commit referenciado o #id da issue: (close #id); 
- Uma vez que tiver finalizado a tarefa, crie uma merge request (MR) para o master;
- Faz um merge do master no seu branch, corrigi os conflitos e dê um push;
- Resolva a MR; 
- Caso o pipeline da sua MR falhe, resolva os erros no seu branch, faça o push e resolva a MR novamente até que o pipeline passe.
