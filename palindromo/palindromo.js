let text = "anulalalunapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero"
let text2="";
let array = text.split("");
let cont1 = 0;
let cont2 = 0;
let palindrome=[""];
let reverse=[""];

while(cont1 < text.length){
    cont2++;
    if(array[cont1] === array[cont2] && (cont2-cont1)>3){
        text2="";
        for(let i=cont1; i<=cont2; i++){
            text2 += array[i];            
        }
        reverse = text2.split("");
        reverse.reverse();
        if(text2===reverse.join("")){
            if(palindrome[0] === ""){palindrome[0]=text2;}
            else{palindrome.push(text2);}
            cont1 = cont2 + 1;
            cont2++;       
        }
    }
    if(cont2 >= text.length && cont1 < text.length){
        cont1++;
        cont2 = cont1;
    }
}

console.log(palindrome);