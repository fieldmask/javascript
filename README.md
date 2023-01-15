 <br/>
 <br/>

 <p align="center"><img src="https://palettes.andev.ml/assets/image/icon/128x128.png"/></p>

- [Demo](https://fieldmask.github.io/doc/demo/)
  
# <p align="center">FieldMask</p>

<p align="center">A simple masking library for javascript input</p>

<p align="center">
    <p align="center" >
        <img src="https://img.shields.io/badge/License-MIT-319046?" alt="License-MIT"/>&nbsp;&nbsp;
        <a href="https://www.npmjs.com/package/@fieldmask/javascript" target="_blank">
            <img src="https://img.shields.io/badge/npm-0.1.0-319046?" alt="NPM Version"/>
        </a>
    </p>
</p>

### Installation
>CDN
```html
    <script src="https://fieldmask.github.io/cdnjs/0.1.0/fieldmask.js"></script>
```

### How to use

```html
    <input type="text" fieldmask="maskname"> <!-- 'maskname' -->

    <!-- cdn -->
    <script src="https://fieldmask.github.io/cdnjs/0.1.0/fieldmask.js"></script>
    <script>
        fieldmask()
    </script>

    <!-- module -->
```

### Predefined Masks

| Mask Name        | Mask Format |
| ----------- | ------------------------ | 
| cpf         | 000.000.000-00           | 
| cnpj        | 00.000.000/0000-00       | 
| tel         | 0000-0000                | 
| ddd+tel     | (00) 0000-0000           | 
| cel         | 00000-0000               | 
| ddd+cel     | (00) 00000-0000          | 
| cep         | 00000-000                | 
| date        | 00/00/0000               | 
| time        | 00:00:00                 | 
| dateTime    | 00/00/0000 00:00:00      | 
| currency    | ["000.000.000,00", { reverse: true}]        | 
| centimeter  | ["000", { reverse: true, suffix: "cm" }]    | 
| meter       | ["0000", { reverse: true, suffix: "m" }]    | 
| ip          | 000.000.000.000           | 
| letter      | [a-z] [A-Z]               | 
| number      | [0-9]                     | 

### ⭐ How to create custom maskt format
> Indicator for define mask: 0

#### - Example with string only
```html
    <input type="text" fieldmask="date">
```
```js
    fieldmask({
        'date': '00-00-0000'
    })
```

#### - Mask options type
```js
    fieldmask({
        'customMaskName': string | [maskFormat, options?: {
            reverse: boolean, // Reverse the typing start side 
            prefix: string,   // prefix+mask
            suffix: string,   // mask+suffix
        }]
    })
```

#### - Example with options
```html
    <input type="text" fieldmask="real">
```
```js
    fieldmask({
        'real': ['00,00', {prefix: 'R$', reverse: true}]
    })
```

<br/>
<br/>

<p align="center">©fieldmask | License MIT</p>