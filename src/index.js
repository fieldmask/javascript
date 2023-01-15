//------------------------------------------------//
//                                                //
// ©fieldmask v0.1.0                              //
// @repo: https://github.com/fieldmask/javascript //
// @author: https://github.com/andremalveira      //
//                                                //
//------------------------------------------------//

let $formatMask = {} ;
const fieldmask = (clientFormatMask) => {
    let allInputs = document.querySelectorAll("input[fieldmask]");
    $formatMask = {
        "cpf": "000.000.000-00",
        "cnpj": "00.000.000/0000-00",
        "tel": "0000-0000",
        "ddd+tel": "(00) 0000-0000",
        "cel": "00000-0000",
        "ddd+cel": "(00) 00000-0000",
        "cep": "00000-000",
        "date": "00/00/0000",
        "time": "00:00:00",
        "dateTime": "00/00/0000 00:00:00",
        "currency": ["000.000.000,00", { reverse: true}],
        "centimeter": ["000", { reverse: true, suffix: "cm" }],
        "meter": ["0000", { reverse: true, suffix: "m" }],
        "ip": "000.000.000.000",
        "letter": "",
        "number": "",
        "numbers-characters": "",
    };

    if(clientFormatMask) $formatMask = Object.assign({}, $formatMask, clientFormatMask)

    function ifKeyExist(obj, key) {
        if (obj[key] == undefined) {
            return false;
        } else {
            return true;
        }
    }

    function setInputError(input, errorMessage) {
        input.placeholder = '⚠️ '+errorMessage
        input.style.border = '2px solid #de3641'
        console.error("Input: ", input);
        throw new Error(errorMessage);
    }

    document.addEventListener('DOMContentLoaded', function () {
        Array.prototype.forEach.call(allInputs, function (inputs) {
            var codOk = null;
            let _INPUT_MASK = inputs.attributes["fieldmask"].value;
    
            let formatMaskValue,
                isReverse = false,
                hasPrefix = '',
                hasSuffix = '',
                maxInputLength, 
                valueLength,
                chartX = null, 
                inputValueLimit = '';
    
            String.prototype.reverse = function () {
                return this.split("").reverse().join("");
            };
    
    
            //errors
            if(inputs.type !== "text") {
                setInputError(inputs, "The input's type property must be 'text'")
            }
            if(_INPUT_MASK == "") {
    
                setInputError(inputs, 'Input attribute [fieldmask=""] is empty, enter a mask type as value. Ex: fieldmask="cpf", "cnpj", "zip" and etc... '),
                codOk = false;
    
            } else if(ifKeyExist($formatMask, _INPUT_MASK) == false) {
                setInputError(inputs, 'Mask "' +
                _INPUT_MASK +
                '" in [fieldmask="' +
                _INPUT_MASK +
                '"] does not exist, check that the name is correct, or declare your own mask in the fieldmask run, like this: fieldmask({"' +
                _INPUT_MASK +
                '":"mask format, Ex: 00.00.00"})'),
                codOk = false;
    
            } else {
                (codOk = true)
            }
    
            if (codOk) {
                const setFormatMaskValue = ($formatMask, _INPUT_MASK) => {
                    formatMaskValue = (isArray =
                        Array.isArray($formatMask[_INPUT_MASK]) == true)
                        ? $formatMask[_INPUT_MASK][0]
                        : $formatMask[_INPUT_MASK];
    
                    maxInputLength = formatMaskValue.length;
        
                    if (isArray == true && $formatMask[_INPUT_MASK][1]) {
                        const {
                            reverse,
                            prefix = "",
                            suffix = "",
                        } = $formatMask[_INPUT_MASK][1];
        
                        isReverse = reverse;
                        hasPrefix = prefix;
                        hasSuffix = suffix;
        
                        maxInputLength =
                            formatMaskValue.length +
                            hasPrefix.length +
                            hasSuffix.length;
                    }

                }
                setFormatMaskValue($formatMask, _INPUT_MASK)
    
                if (_INPUT_MASK == "number" || _INPUT_MASK == "letter" || _INPUT_MASK == "numbers-characters" || _INPUT_MASK == "letters-characters") {
                    const onlyNumberCaracters = (value) => {
                        return value.replace(/[A-Za-z]*$/g, "");
                    };
                    const onlyLetters = (value) => {
                        return value.replace(/[0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]+/g, "");
                    };
                    const onlyNumbers = (value) => {
                        return value.replace(/\D/g, "");
                    };
                    //^[A-Z@~`!@#$%^&*()_=+\\';:"\/?>.<,-]*$ - only numbers
                    if (_INPUT_MASK == "number"  || _INPUT_MASK == "numbers-characters") {
                        let numberEvent = function () {
                            var i = inputs.value.length;
                            var str = inputs.value;
    
                            if (_INPUT_MASK == "number") {
                                if (isNaN(Number(str.charAt(i - 1)))) {
                                    inputs.value = str.substr(0, i - 1);
                                }
                                inputs.value = onlyNumbers(inputs.value);
                            }
    
                            if (_INPUT_MASK == "numbers-characters") {
                                inputs.value = onlyNumberCaracters(inputs.value);
                            }
                        }
                        inputs.addEventListener('input', numberEvent);
    
                    } else if (_INPUT_MASK == "letter") {
                        let letterEvent = function () {
                            var i = inputs.value.length;
                            var str = inputs.value;
                            if (Number(str.charAt(i - 1))) {
                                inputs.value = str.substr(0, i - 1);
                            }
                            inputs.value = onlyLetters(inputs.value);
                        }
                        inputs.addEventListener('input', letterEvent);
                    }
                } else {

                    const insertMask = (value) => {
                        var inputValue =
                            isReverse == true
                                ? value.replace(/[^\d]+/gi, "").reverse()
                                : value.replace(/[^\d]+/gi, "");
    
                        var inputValueLength =
                            isReverse == true
                                ? inputValue.length
                                : inputValue.length + 1;
    
                        var result = "";
                        var mask =
                            isReverse == true
                                ? formatMaskValue.reverse()
                                : formatMaskValue;
    
                        for (
                            var x = 0, y = 0;
                            x < mask.length && y < inputValueLength;
    
                        ) {
                            if (mask.charAt(x) != "0") {
                                result += mask.charAt(x);
                                x++;
                                chartX = x
                            } else {
                                result += inputValue.charAt(y);
                                y++;
                                x++;
                            }
                        }
    
                        return isReverse == true
                            ? (hasPrefix ? hasPrefix : "") +
                                  result.reverse() +
                                  (hasSuffix ? hasSuffix : "")
                            : (hasPrefix ? hasPrefix : "") +
                                  result +
                                  (hasSuffix ? hasSuffix : "");
                    };
    
                    const setCursorPosition = () => {
                        let l = inputs.value.length - (hasSuffix.length);
                        valueLength = l.toString().includes("-") ? l * -1 : l;
    
                        if(valueLength - (hasPrefix.length ? hasPrefix.length : 0) === 0) {
                            inputs.value = ''
                        }
    
                        if(!isReverse && chartX == valueLength) {
                            inputs.setSelectionRange(valueLength - 1, valueLength - 1);
                        } else {
                            inputs.setSelectionRange(valueLength, valueLength);
                        }
                    };
    
                    const allMaskEvent = function (event) {
                        var i = inputs.value.length;
                        var str = inputs.value;

                        if (i <= maxInputLength) {
                            if (isNaN(Number(str.charAt(i - 1)))) {
                                inputs.value = str.substr(0, i - 1);
                            }
                            inputs.value = insertMask(inputs.value);
                            inputValueLimit = inputs.value
                        } else {
                            inputs.value = inputValueLimit
                        }
              
                        setFormatMaskValue($formatMask, inputs.attributes["fieldmask"].value)
                        if(maxInputLength) inputs.setAttribute("maxlength", maxInputLength);

                        setCursorPosition();
                    }
    
                    inputs.addEventListener('input', allMaskEvent);
    
                    inputs.addEventListener('focus', setCursorPosition);
                    inputs.addEventListener('blur', setCursorPosition);
    
                    if (inputs.value.length >= 1) {
                        inputs.value = insertMask(inputs.value);
                    }
                }
            }
        });
    })
};

