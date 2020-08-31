![Logo Coronga Tracker e Code For Curitiba](/assets/header.jpg)

# coronga-tracker

## Problema
Durante um processo de retomada de atividades e diminuição do isolamento social, as pessoas se sentirão mais seguras com a possibilidade de realizar testes de contaminação pela COVID19. Realizar testes o mais cedo possível tem 2 benefícios:    
1. As pessoas podem iniciar tratamentos mais cedo;    
2. As pessoas podem se isolar e evitar a propagação do vírus.   
O problema é que muitas vezes o teste só é feito após os primeiros sintomas. Considerando que a doença muitas vezes é assintomática, isto dificulta o controle da propagação da doença.    
## Objetivo   
O objetivo deste projeto é disponibilizar (dentre muitas) uma forma de alertar as pessoas quanto à necessidade de fazer um teste em função de ter tido eventual contato com outra pessoa contaminada (o que diminui a janela de propagação para as pessoas contaminadas assintomáticas).   
A solução final está baseada nos princípios:
1. Todo o processo não coletará dados dos usuários participantes. E os dados cedidos de forma voluntária deverão manter o anonimato das pessoas.
2. Uma solução Web: não demanda a instalação de um aplicativo.
3. Código aberto e desenvolvimento colaborativo de forma a coletar o maior número possível de contribuições.
## Jornadas   
1. Solução para dispositivo móvel:   
Os usuários da solução podem acessar site Web (não há necessidade de instalar aplicativo) que permitirá manter *no dispositivo do usuário* (sem compartilhamento de dados) um histórico de locais por onde a pessoa esteve.   
2. Compartilhamento de histórico por pessoas contaminadas:   
Uma pessoa contaminada pode escolher compartilhar seu histórico de locais com um sistema central.    
3. Verificação de risco:    
Um usuário poderá solicitar ao sistema central que seu histórico de locais seja comparado com os históricos contaminados das pessoas contaminadas. A comparação considerará as referências geográficas e datas dos históricos e emitirá um alerta nos casos em que ocorram coincidências de localização (*match*), sugerindo ao usuário procurar os agente sanitários e/ou realizar testagem.    
## Premissas   
1. Os usuários manterão um histórico de localizações confiáveis.    
2. Os usuários que testarem positivo compartilharão seus históricos.   
3. O sistema central fará uma checagem dos históricos compartilhados contra uma base confiável de forma a garantir a veracidade da confirmação de contaminação.   
## Equipe   
Este projeto é desenvolvido de forma voluntária e qualquer pessoa interessada está convidada a participar e contribuir.   

## Solução  
### Progressive Web Application - PWA
Uma solução PWA (sem a necessidade de instalação de aplicativo) que permita aos usuários manter um registro dos seus históricos de locais visitados.    
A solução não coletará dados mantendo a privacidade dos usuários.   
### Sistema Central   
Um sistema central que armazenará os dados cedidos voluntariamente pelas pessoas contaminadas.   
O sistema central deverá ter um mecanismo de confirmação da veracidade dos dados compartilhados.   
Quando solicitado pelos usuários, o sistema central permitirá o cruzamento de informações e informará a possibilidade de risco de contaminação.   

### Acesso   
O aplicativo está disponível neste endereço:

[Covid-Tracker](https://master.d1nbtlicy20gae.amplifyapp.com/)



