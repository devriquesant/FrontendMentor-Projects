# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

# Language / Língua:
- [Português (nativo)](#-português)
- [English](#-english)

# Results
- [Captura](#captura-de-tela)
- [Autor](#autor)
- [Links](#links)

## Captura de tela

![](./screenshot.png)


## Links

- Solution / Solução: [Github](https://github.com/devriquesant/FrontendMentor-Projects/tree/main/Projects/Interactive-card-details-form-main)
- Site: [Site](https://devriquesant.github.io/FrontendMentor-Projects/Projects/Interactive-card-details-form-main/)

# <img src="https://cdn-icons-png.flaticon.com/512/9906/9906449.png" width="30px"/> Português

## Tabela de conteúdos

- [Visão Geral](#visão-geral)
  - [O desafio](#o-desafio)
- [Meu processo](#meu-processo)
  - [Feito com](#feito-com)
  - [O que eu aprendi](#o-que-eu-aprendi)
  - [Recursos úteis](#recursos-úteis)

## Visão Geral

### O desafio

Os usuários devem ser capazes de:

- Preencher o formulário e ver os detalhes do cartão atualizando em tempo real
- Receber menssagens de error quando o formulário for enviado se:
    - Algum campo estiver vazio
    - O número do cartão, a data de validade ou o campo CVC estiverem no formato errado
- Ver o layout otimizado dependendo do tamanho da tela de seus dispositivos
- Ver os estados: `hover`, `active` e `focus` para elementos interativos na página

## Meu processo

### Feito com

- Linguagem de marcação HTML5
- Propriedades customizadas CSS
- Flexbox
- CSS Grid
- Mobile-first
- Javascript
- Módulos Javascript

### O que eu aprendi

Em geral, o projeto foi bem desafiador mais fácil de se realizar. Além de implementar todos os comportamentos necessários, também adicionei:

- Animação aos cartões de crédito ( CSS )
- Animação de entrada do formulário ( CSS )
- Limitação de preenchimento dos campos do formulário ( JS )

Optei por realizar animações para mostrar mais dinâmica à página e limitei o preenchimento para guiar os usuários ao formato em que eless devem estar.

Apesar de todas as modificações, meu únic problema veio na estilização. No preview era mostrado que as bordas dos campos do formulário estavam com um gradiente e com a propriedade `border-radius`. Tentei diversas formas mais não pude, com o conhecimento atual, implementar esse estilo.

Então, pesquisandosobre achei no GithubGist uma resposta do usuário `@stereokai` para `CSS rounded corners with gradient border` com o seguinte:

```css

.rounded-corners-gradient-borders {
    width: 300px;
    height: 80px;
    border: double 4px transparent;
    border-radius: 80px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #f00,#3020ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

```

Dessa forma o input funcionou corretamente com o a borda arredondada e com uma cor gradient.

Nessa solução foi utlizada as propriedades `image`, `origin` e `clip`

- `background-image`:

Essa propriedade define dois componentes, linear-gradient e radial-gradient. O primeiro irá definir a imagem de fundo principal e o segundo irá ficar por trás como segundo plano.

`linear-gradient` irá definir a cor de fundo no input, nesse caso definido como `white`, branco.

`radial-gradient` irá definir a cor de fundo atrás do principal, com as cores da borda desejadas (já explico o porquê)

- `background-origin`:

Essa propriedade define onde irá começar a ser desenhada a imagem de fundo (`background-image`) e possui três propriedades principais:

- **padding-box**: começa na caixa de preenchimento (padding-box)
- **border-box**: começa na borda
- **content-box** começa no conteúdo

Todas inicializam no canto superior esquerdo relativo as suas propriedades.

Nessa propriedade foi posto **border-box** para ele renderizar partindo da borda

- `background-clip`:

Essa última propriedade define um corte na imagem de fundo `background-image`.

background-clip possui dois atributos que são relativos à cada imagem do background-image.

O primeiro é **padding-box** para **linear-gradient**:
O linear-gradient será preenchido somente dentro do **padding**, ou seja, no conteúdo até a borda (excluíndo a borda)

O segundo é **border-box** para **radial-gradient**:
O radial-gradient será preenchido somente dentro de **border**, a borda.

Dessa forma é criada a sensação de que a borda está em gradiente, porém é apenas o fundo colorido.

Após essas modificações é possível modificar a borda com `border-radius` e está pronto!

### Recursos úteis

- [Github Gist: @stereokai - CSS rounded corners with gradient border](https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0)


# <img src="https://cdn-icons-png.flaticon.com/512/3909/3909383.png" width="30px"/> English


## Tabela de conteúdos

- [Overview](#overview)
  - [The challenge](#o-desafio)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users must be able to:

- Fill in the form and see the card details updating in real time
- Receive error messages when the form is submitted if:
     - Some field is empty
     - The card number, expiry date or CVC field is in the wrong format
- View optimized layout depending on your devices screen size
- View states: `hover`, `active` and `focus` for interactive elements on the page

## My process

### Built with

- HTML5 markup language
- Custom CSS properties
- Flexbox
- CSS Grid
- Mobile-first
- Javascript
- Javascript modules

### What I learned

In general, the project was very challenging and easy to carry out. In addition to implementing all the necessary behaviors, I also added:

- Credit card animation ( CSS )
- Form input animation (CSS)
- Limitation of completion of form fields ( JS )

I chose to perform animations to show more dynamics to the page and limited the padding to guide users to the format they should be in.

Despite all the modifications, my only issue came with the styling. In the preview it was shown that the borders of the form fields had a gradient and the `border-radius` property. I tried several ways but I couldn't, with current knowledge, implement this style.

So, digging around on GithubGist I found an answer from user `@stereokai` to `CSS rounded corners with gradient border` with the following:

```css

.rounded-corners-gradient-borders {
    width: 300px;
    height: 80px;
    border: double 4px transparent;
    border-radius: 80px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #f00,#3020ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

```

That way the input worked correctly with the rounded border and with a gradient color.

In this solution, the properties `image`, `origin` and `clip` were used

- `background-image`:

This property defines two components, linear-gradient and radial-gradient. The first one will set the main background image and the second one will go behind as the background.

`linear-gradient` will set the background color on the input, in this case set to `white`.

`radial-gradient` will set the background color behind the main one, with the desired border colors (I'll explain why in a moment)

- `background-origin`:

This property defines where the background image (`background-image`) will start to be drawn and has three main properties:

- **padding-box**: starts at the padding-box
- **border-box**: starts at the border
- **content-box** starts at content

They all start in the upper left corner relative to their properties.

This property has **border-box** so that it renders from the border

- `background-clip`:

This last property defines a clip on the background image `background-image`.

background-clip has two attributes that are relative to each image in the background-image.

The first is **padding-box** for **linear-gradient**:
The linear-gradient will only be filled inside the **padding**, i.e. in the content up to the edge (excluding the edge)

The second is **border-box** for **radial-gradient**:
The radial-gradient will only be filled inside **border**, the border.

In this way, the sensation is created that the border is in a gradient, but it is only the colored background.

After these modifications it is possible to modify the border with `border-radius` and it's done!

### Useful resources

- [Github Gist: @stereokai - CSS rounded corners with gradient border](https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0)


## Autor

- Frontend Mentor - [@devriquesant](https://www.frontendmentor.io/profile/devriquesant)
- Github - [@devriquesant](https://github.com/devriquesant)