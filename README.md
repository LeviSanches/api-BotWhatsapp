# API para automatizar o envio de mensagens
API para envio de mensagem para whatsapp que criei para implementar em uma aplicação.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)

## Instalação

1. Clone o repositório:

```bash
https://github.com/LeviSanches/api-BotWhatsapp.git
```
Ou baixe os arquivos zip.

2. Instale as depedências: <br>
```npm install```

3. Inicie o projeto: <br>
```npm run dev```


## Uso
Para utilizar o projeto é bastante simples, a primeira vez que for iniciar o projeto, vai ser exibido no terminal o QRcode para fazer a conexão do aparelho que deseja enviar as mensagens.
Após realizar com sucesso, basta enviar uma solicitação POST na rota "/send" utilizando os parâmetros number e message.
```javascript
app.post("/send", async (req: Request, res: Response) => {   
    const { number, message } = req.body
    
    try {
        await sender.sendText(number, message); 
        
        return res.status(200).json()

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: error})
    } 
})
```
Exemplo da utilização do JSON:
```JSON
{
  "number": "759999999999",
  "message": "Exemplo de mensagem enviada pelo venom-bot"
}
```
enviando uma solicitação na rota /send com o body no formato JSON como foi exemplificado acima é o suficiente para enviar uma mensagem. <br>
As possibilidades de uso são infinitas, divirta-se!

