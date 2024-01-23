
const output = document.getElementById("output");
const infoOutput= document.getElementById("info-output")
const searchImg=document.getElementById("search-img")
const sound =document.getElementById("sound");
const search= document.getElementById("search");
const input =document.getElementById("input")
const searchedWord=document.getElementById("word")
const infoText= document.getElementById("info-text")
const meanings=document.getElementById("meanings")
const phonetics=document.getElementById("phonetics")
let audio;

//data function
function data(result, word){
    if(result.tittle){
        console.log(result.tittle)
        output.innerHTML=`Can't find the meaning of ${word}. Please, try another word}`
    }else{
        console.log(result);
        let count=0
         //passing a particular response data to a particular html element
        searchedWord.innerText=result[0].word
        phonetics.innerHTML=result[0].phonetics[0].text ||result[0].phonetics[1].text
        audio=new Audio(result[0].phonetics[0].audio)
        
        let meaningsDiv=document.createElement("div");
        let eachMeaning=document.createElement("p");
        let eachExample=document.createElement("p");
        let meaningHead=document.createElement("h3");
        let partOfSpeech=["noun", "pronoun", "adjective", "conjuction", "preposition", "verb", "adverb", "interjection"]
        let availableSpeech = ""
        let speech=""
        partOfSpeech.forEach(part => {
            if (result[0].meaning[part]){
                availableSpeech = result[0].meaning[part];
                speech=[part]
                console.log(speech)
                return
            }
        })
        console.log(speech)
        console.log(availableSpeech)
        let wordInfo=availableSpeech[count]
        console.log(wordInfo)
        let meaning= wordInfo.definition;
        let ex=wordInfo.example
        let example= `example:  ${ex}`; 
        meaningHead.innerHTML=speech
        eachMeaning.innerHTML=meaning;
        eachExample.innerHTML=example; 

        //return 5 or less definitions
        // for (count<=5; count++;){
        //     eachMeaning.innerHTML=meaning;
        //     eachExample.innerHTML=example; 
        // }
        //create p tags for the numbers of definitions and append to parent div
        meaningsDiv.appendChild(meaningHead);
        meaningsDiv.appendChild(eachMeaning);
        meaningsDiv.appendChild(eachExample);
        meaningsDiv.classList.add("info-output-div");
        infoOutput.innerHTML = ""
        infoOutput.appendChild(meaningsDiv)
        
        
       
        //create div and p tags for antonyms
        let antonymsDiv=document.createElement("div");
        let antonymsTag=document.createElement("p");
        let antonymHead=document.createElement("h3")
        
        //return Antonyms not more than 5
        //check if antonymn is available
        let antonyms=wordInfo.antonyms[count];
        //if antonymn is not available
        if(antonyms===undefined){  
            let antonym="No Antonym is available for this word";
            antonymsTag.innerHTML = antonym;
        }
        //if antonym is available, create p tags for numbers availble and append to the parent div
        else{ 
            for (count<=5; count++;){
                antonymsTag.innerHTML = antonyms;   
            }
            }
        antonymHead.innerHTML="Antonyms:";
        antonymsDiv.classList.add("relation-div");
        antonymsDiv.appendChild(antonymHead);
        antonymsDiv.appendChild(antonymsTag);
        meaningsDiv.appendChild(antonymsDiv);

        //return synonyms not more than 5
        //create div and p tags for antonyms
        let synonymsDiv=document.createElement("div");
        let synonymsTag=document.createElement("p");
        let synonymHead=document.createElement("h3");
        //check if synonymn is available
        let synonyms=wordInfo.synonyms[0];

        //if synonymn is not available
        if(synonyms===undefined){  
            synonymsTag.innerHTML="No Synonym is available for this word";
            
            // console.log(synonym)
        }

        //if antonym is available, create p tags for numbers availble and append to the parent div
        else{
            synonymsTag.innerHTML = synonyms;
            console.log(synonyms)
            // for (count<=5; count++;){
            //     synonymsTag.innerHTML = synonyms;
            //     console.log(synonyms)
            // }
        }
        synonymHead.innerHTML = "Synonyms:";
        synonymsDiv.classList.add("relation-div");
        synonymsDiv.appendChild(synonymHead);
        synonymsDiv.appendChild(synonymsTag);
        meaningsDiv.appendChild(synonymsDiv);
        
        
        // output.classList.add("active")

       
        
    }

}

//fetch api function
function fetchApi(){

    let word=input.value
    // infoText.innerHTML=`Searching the meaning of ${word}`
    let url=`https://api.dictionaryapi.dev/api/v1/entries/en/${word}`;
    
    fetch(url)
    .then(response =>{
        return response.json();
    })
    .then(result=> {
        data(result, word);
    })
    .catch (error=>{
        console.log(error);
    })
    // const newImg = document.createElement("img");
    // newImg.setAttribute("src", "images/272-cross.png");
    // searchImg.innerHTML=newImg;
};
search.addEventListener("click", fetchApi);
input.addEventListener("keydown", (e) =>{ 
    // A function that allows enter to send
    if (e.keyCode === 13){
        e.preventDefault()
        fetchApi();
        input.value=""
    }    
})

sound.addEventListener("click", ()=>{
    audio.play();
}
)
